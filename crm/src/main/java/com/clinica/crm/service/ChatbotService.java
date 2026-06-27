package com.clinica.crm.service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import com.clinica.crm.dto.ChatRequest;
import com.clinica.crm.dto.ChatResponse;
import com.clinica.crm.entity.CadastroLead;
import com.clinica.crm.entity.Cliente;
import com.clinica.crm.repository.CadastroLeadRepository;
import com.clinica.crm.repository.ClienteRepository;
import com.clinica.crm.repository.MensagemAutomaticaRepository;
import com.clinica.crm.repository.ClinicaRepository;
import com.clinica.crm.entity.Clinica;
import com.clinica.crm.entity.Mensagem;
import com.clinica.crm.entity.MensagemAutomatica;
import com.clinica.crm.repository.MensagemRepository;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Service
public class ChatbotService {

    @Autowired
    private ClinicaRepository clinicaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CadastroLeadRepository leadRepository;

    @Autowired
    private MensagemAutomaticaRepository mensagemAutomaticaRepository; // para buscar mensagens automáticas

    @Autowired
    private MensagemRepository mensagemRepository;

    public String detectarTipo(String mensagem) {

        if (mensagem == null)
            return "BOAS_VINDAS";

        String msg = mensagem.toLowerCase();

        if (msg.contains("consulta") || msg.contains("agendar")) {
            return "CONSULTA";
        }

        if (msg.contains("atendente") || msg.contains("humano") || msg.contains("falar com alguém")) {
            return "ATENDENTE";
        }

        if (msg.contains("convênio") || msg.contains("plano")) {
            return "CONVENIO";
        }

        if (msg.contains("horario") || msg.contains("horário")) {
            return "HORARIO";
        }

        return "BOAS_VINDAS";
    }

    public CadastroLead buscarLeadPorId(Long idLead) {
        return leadRepository.findById(idLead)
                .orElseThrow(() -> new RuntimeException("Lead não encontrado"));
    }

    public CadastroLead buscarUltimoLeadPorTelefone(String telefone) {
        Cliente cliente = clienteRepository.findByTelefone(telefone);

        if (cliente == null) {
            return null;
        }

        return leadRepository.findTopByClienteIdClienteOrderByIdCadastroLeadDesc(cliente.getIdCliente())
                .orElse(null);
    }

    public Long buscarOuCriarLead(String telefone, String nome, ChatRequest request) {

        Cliente cliente = clienteRepository.findByTelefone(telefone);

        // Buscar clínica
        Clinica clinica = clinicaRepository.findById(1L).orElse(null);

        if (cliente == null) {
            cliente = new Cliente();
            cliente.setTelefone(telefone);
            cliente.setNome(nome);
            cliente.setDataCadastro(LocalDateTime.now());
            cliente.setClinica(clinica);

            cliente = clienteRepository.save(cliente);
        }

        // Buscar último lead
        CadastroLead lead = leadRepository.findTopByClienteIdClienteOrderByIdCadastroLeadDesc(cliente.getIdCliente())
                .orElse(null);

        // Detectar tipo UMA vez
        String mensagem = request.getMensagem();
        String tipo = detectarTipo(mensagem);

        if (lead == null) {
            // NOVO LEAD
            lead = new CadastroLead();
            lead.setCliente(cliente);
            lead.setDataCriacao(LocalDateTime.now());
            lead.setInteresse(tipo);
            lead.setStatus("ABERTO"); //  AJUSTADO

            // opcional: manter sempre aberto enquanto conversa
            lead.setStatus("ABERTO");

            lead = leadRepository.save(lead);
        } else {

            // ATUALIZA LEAD EXISTENTE
            if (!tipo.equals("BOAS_VINDAS")) {
                lead.setInteresse(tipo);
            }
            // LEAD EXISTE → manter aberto (se não finalizado)
            if (!"GANHO".equals(lead.getStatus()) && !"PERDIDO".equals(lead.getStatus())) {
                lead.setStatus("ABERTO");
                leadRepository.save(lead);
            }
        }

        return lead.getIdCadastroLead();
    }

    public ChatResponse processar(ChatRequest request) {

        String mensagem = request.getMensagem();

        CadastroLead lead = leadRepository.findById(request.getIdLead())
                .orElseThrow(() -> new RuntimeException("Lead não encontrado"));

        String tipo = detectarTipo(mensagem);

        // Atualiza interesse do lead
        if (!tipo.equals("BOAS_VINDAS")) {
            lead.setInteresse(tipo);
        }

        lead.setStatus("ABERTO");
        leadRepository.save(lead);

        // Salva mensagem do cliente
        Mensagem msgCliente = new Mensagem();
        msgCliente.setConteudo(mensagem);
        msgCliente.setOrigem("CLIENTE");
        msgCliente.setDataEnvio(LocalDateTime.now());
        msgCliente.setLead(lead);
        mensagemRepository.save(msgCliente);

        // Busca a resposta automatica da mesma clinica do lead.
        Long idClinica = lead.getCliente().getClinica().getIdClinica();
        MensagemAutomatica mensagemAutomatica = mensagemAutomaticaRepository
                .findByTipoAndAtivoTrueAndClinica_IdClinica(tipo, idClinica);

        String resposta = mensagemAutomatica != null
                ? mensagemAutomatica.getConteudo()
                : "Não entendi, pode reformular?";

        // Salva resposta do bot
        Mensagem msgBot = new Mensagem();
        msgBot.setConteudo(resposta);
        msgBot.setOrigem("BOT");
        msgBot.setDataEnvio(LocalDateTime.now());
        msgBot.setLead(lead);
        mensagemRepository.save(msgBot);

        ChatResponse response = new ChatResponse();
        response.setMensagemBot(resposta);
        response.setTipo(tipo);

        return response;
    }
    
    @Value("${zapi.instance-id:${ZAPI_INSTANCE_ID}:}")
    private String zapiInstanceId;

    @Value("${zapi.token:${ZAPI_TOKEN}:}")
    private String zapiToken;

    @Value("${zapi.client-token:${ZAPI_CLIENT_TOKEN}:}")
    private String zapiClientToken;

    public void enviarMensagemWhatsApp(String telefone, String mensagem) {

        try {

            if (zapiInstanceId == null || zapiInstanceId.isBlank() || zapiToken == null || zapiToken.isBlank()
                    || zapiClientToken == null || zapiClientToken.isBlank()) {
                throw new IllegalStateException(
                        "Z-API client token, instance ID ou token não estão configurados. Verifique application.properties.");
            }

            String url = "https://api.z-api.io/instances/" + zapiInstanceId + "/token/" + zapiToken + "/send-text";

            RestTemplate rest = new RestTemplate();

            telefone = telefone.replaceAll("\\D", "");

            if (!telefone.startsWith("55")) {
                telefone = "55" + telefone;
            }

            // BODY
            Map<String, Object> body = new HashMap<>();
            body.put("phone", telefone);
            body.put("message", mensagem);

            // HEADERS (AQUI ESTÁ O SEGREDO)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Client-Token", zapiClientToken);

            // REQUEST COMPLETA
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = rest.postForEntity(url, request, String.class);

            System.out.println(" RESPOSTA Z-API: " + response.getBody());

        } catch (Exception e) {
            System.err.println(" ERRO AO ENVIAR MENSAGEM: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
