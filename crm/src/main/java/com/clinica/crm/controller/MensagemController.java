package com.clinica.crm.controller;

import com.clinica.crm.dto.MensagemRequest;
import com.clinica.crm.dto.MensagemResponse;
import com.clinica.crm.entity.CadastroLead;
import com.clinica.crm.entity.Mensagem;
import com.clinica.crm.repository.CadastroLeadRepository;
import com.clinica.crm.repository.MensagemRepository;
import com.clinica.crm.service.ClinicaContextService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/mensagens")
public class MensagemController {

    private final MensagemRepository repository;
    private final CadastroLeadRepository leadRepository;
    private final ClinicaContextService clinicaContextService;

    public MensagemController(
            MensagemRepository repository,
            CadastroLeadRepository leadRepository,
            ClinicaContextService clinicaContextService) {
        this.repository = repository;
        this.leadRepository = leadRepository;
        this.clinicaContextService = clinicaContextService;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody MensagemRequest dados,
            HttpServletRequest request) {
        ResponseEntity<?> erroValidacao = validar(dados);
        if (erroValidacao != null) {
            return erroValidacao;
        }

        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);
        CadastroLead lead = leadRepository
                .findByIdCadastroLeadAndCliente_Clinica_IdClinica(dados.getIdLead(), idClinica)
                .orElse(null);

        if (lead == null) {
            return ResponseEntity.notFound().build();
        }

        Mensagem mensagem = new Mensagem();
        mensagem.setConteudo(dados.getConteudo().trim());
        mensagem.setOrigem(normalizar(dados.getOrigem()));
        mensagem.setDataEnvio(LocalDateTime.now());
        mensagem.setLead(lead);

        return ResponseEntity.ok(new MensagemResponse(repository.save(mensagem)));
    }

    @GetMapping
    public List<MensagemResponse> listar(HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByLead_Cliente_Clinica_IdClinicaOrderByDataEnvioAsc(idClinica)
                .stream()
                .map(MensagemResponse::new)
                .toList();
    }

    @GetMapping("/lead/{id}")
    public ResponseEntity<?> listarPorLead(
            @PathVariable Long id,
            HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        if (leadRepository
                .findByIdCadastroLeadAndCliente_Clinica_IdClinica(id, idClinica)
                .isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<MensagemResponse> mensagens = repository
                .findByLead_IdCadastroLeadAndLead_Cliente_Clinica_IdClinicaOrderByDataEnvioAsc(
                        id,
                        idClinica)
                .stream()
                .map(MensagemResponse::new)
                .toList();

        return ResponseEntity.ok(mensagens);
    }

    private ResponseEntity<?> validar(MensagemRequest dados) {
        if (dados == null
                || dados.getIdLead() == null
                || dados.getConteudo() == null
                || dados.getConteudo().isBlank()
                || dados.getOrigem() == null
                || dados.getOrigem().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "mensagem",
                            "Lead, conteudo e origem sao obrigatorios."));
        }

        String origem = normalizar(dados.getOrigem());
        if (!origem.equals("CLIENTE") && !origem.equals("BOT")) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Origem deve ser CLIENTE ou BOT."));
        }

        return null;
    }

    private String normalizar(String valor) {
        return valor.trim().toUpperCase(Locale.ROOT);
    }
}
