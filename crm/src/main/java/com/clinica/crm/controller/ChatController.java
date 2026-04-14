package com.clinica.crm.controller;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.*;

import com.clinica.crm.entity.CadastroLead;
import com.clinica.crm.entity.Mensagem;
import com.clinica.crm.entity.MensagemAutomatica;
import com.clinica.crm.repository.CadastroLeadRepository;
import com.clinica.crm.repository.MensagemAutomaticaRepository;
import com.clinica.crm.repository.MensagemRepository;
import com.clinica.crm.dto.ChatRequest;
import com.clinica.crm.dto.ChatResponse;
import com.clinica.crm.service.ChatbotService;

@RestController
@RequestMapping("/chat") // DEFINE A URL PARA ESTE CONTROLADOR
public class ChatController {

        private final MensagemRepository mensagemRepository;
        private final CadastroLeadRepository leadRepository;
        private final MensagemAutomaticaRepository autoRepository;
        private final ChatbotService chatbotService; // Service para detectar tipo de mensagem

        public ChatController(
                        MensagemRepository mensagemRepository,
                        CadastroLeadRepository leadRepository,
                        MensagemAutomaticaRepository autoRepository,
                        ChatbotService chatbotService) {

                this.mensagemRepository = mensagemRepository;
                this.leadRepository = leadRepository;
                this.autoRepository = autoRepository;
                this.chatbotService = chatbotService; // Injeção do service
        }

        @PostMapping
        public ChatResponse chat(@RequestBody ChatRequest request) {

                // validar entrada
                if (request.getMensagem() == null || request.getMensagem().isBlank()) {
                        throw new RuntimeException("Mensagem não pode ser vazia");
                }

                // buscar lead
                CadastroLead lead = leadRepository
                                .findById(request.getIdLead())
                                .orElseThrow(() -> new RuntimeException("Lead não encontrado"));

                // detectar tipo (AGORA VIA SERVICE)
                String tipo = chatbotService.detectarTipo(request.getMensagem());

                // buscar resposta automática
                MensagemAutomatica auto = autoRepository.findByTipoAndAtivoTrueAndClinica_IdClinica(tipo,
                                request.getIdClinica());

                String resposta;

                if (auto != null) {
                        resposta = auto.getConteudo();
                } else {
                        resposta = "Desculpe, não entendi. Pode reformular?";
                }

                // Debug opcional
                // System.out.println("Resposta encontrada: " + resposta);
                // System.out.println("Mensagem recebida: " + request.getMensagem());
                // System.out.println("Tipo detectado: " + tipo);

                // salvar mensagem do cliente
                Mensagem msgCliente = new Mensagem();
                msgCliente.setConteudo(request.getMensagem());
                msgCliente.setOrigem("CLIENTE");
                msgCliente.setDataEnvio(LocalDateTime.now());
                msgCliente.setLead(lead);

                mensagemRepository.save(msgCliente);

                // salvar resposta automática
                Mensagem msgBot = new Mensagem();
                msgBot.setConteudo(resposta);
                msgBot.setOrigem("BOT");
                msgBot.setDataEnvio(LocalDateTime.now());
                msgBot.setLead(lead);

                mensagemRepository.save(msgBot);

                // DTO - resposta para frontend (Ajuste NULL SAFETY)
                String nomeCliente = (lead.getCliente() != null)
                                ? lead.getCliente().getNome()
                                : "Não informado";

                String nomeClinica = (lead.getCliente() != null && lead.getCliente().getClinica() != null)
                                ? lead.getCliente().getClinica().getNome()
                                : "Não informado";
                ChatResponse response = new ChatResponse();
                response.setMensagemCliente(request.getMensagem());
                response.setMensagemBot(msgBot.getConteudo());
                response.setDataHora(msgBot.getDataEnvio());
                response.setNomeCliente(nomeCliente);
                response.setNomeClinica(nomeClinica);
                response.setTipo(tipo);

                return response;
        }

        @GetMapping("/inicio")
        public Mensagem iniciarChat(@RequestParam Long idLead,
                        @RequestParam Long idClinica) {

                CadastroLead lead = leadRepository
                                .findById(idLead)
                                .orElseThrow(() -> new RuntimeException("Lead não encontrado"));

                MensagemAutomatica auto = autoRepository
                                .findByTipoAndAtivoTrueAndClinica_IdClinica("BOAS_VINDAS", idClinica);

                Mensagem msgBot = new Mensagem();
                msgBot.setConteudo(auto != null
                                ? auto.getConteudo()
                                : "Olá! Como posso te ajudar!");

                msgBot.setOrigem("BOT");
                msgBot.setDataEnvio(LocalDateTime.now());
                msgBot.setLead(lead);

                return mensagemRepository.save(msgBot);
        }  

}
