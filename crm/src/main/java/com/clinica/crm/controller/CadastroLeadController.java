package com.clinica.crm.controller;

import com.clinica.crm.dto.LeadRequest;
import com.clinica.crm.dto.LeadResponse;
import com.clinica.crm.entity.CadastroLead;
import com.clinica.crm.entity.Cliente;
import com.clinica.crm.repository.CadastroLeadRepository;
import com.clinica.crm.repository.ClienteRepository;
import com.clinica.crm.service.ClinicaContextService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/leads")
public class CadastroLeadController {

    private final CadastroLeadRepository repository;
    private final ClienteRepository clienteRepository;
    private final ClinicaContextService clinicaContextService;

    public CadastroLeadController(
            CadastroLeadRepository repository,
            ClienteRepository clienteRepository,
            ClinicaContextService clinicaContextService) {
        this.repository = repository;
        this.clienteRepository = clienteRepository;
        this.clinicaContextService = clinicaContextService;
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody LeadRequest dados, HttpServletRequest request) {
        ResponseEntity<?> erroValidacao = validar(dados);
        if (erroValidacao != null) {
            return erroValidacao;
        }

        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);
        Cliente cliente = buscarClienteDaClinica(dados.getIdCliente(), idClinica);

        if (cliente == null) {
            return erroClienteNaoEncontrado();
        }

        CadastroLead lead = new CadastroLead();
        lead.setCliente(cliente);
        lead.setInteresse(normalizar(dados.getInteresse()));
        lead.setStatus(normalizar(dados.getStatus()));
        lead.setDataCriacao(LocalDateTime.now());

        return ResponseEntity.ok(new LeadResponse(repository.save(lead)));
    }

    @GetMapping
    public List<LeadResponse> listar(HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByCliente_Clinica_IdClinicaOrderByDataCriacaoDesc(idClinica)
                .stream()
                .map(LeadResponse::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponse> buscarPorId(
            @PathVariable Long id,
            HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByIdCadastroLeadAndCliente_Clinica_IdClinica(id, idClinica)
                .map(LeadResponse::new)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody LeadRequest dados,
            HttpServletRequest request) {
        ResponseEntity<?> erroValidacao = validar(dados);
        if (erroValidacao != null) {
            return erroValidacao;
        }

        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);
        CadastroLead lead = repository
                .findByIdCadastroLeadAndCliente_Clinica_IdClinica(id, idClinica)
                .orElse(null);

        if (lead == null) {
            return ResponseEntity.notFound().build();
        }

        Cliente cliente = buscarClienteDaClinica(dados.getIdCliente(), idClinica);
        if (cliente == null) {
            return erroClienteNaoEncontrado();
        }

        lead.setCliente(cliente);
        lead.setInteresse(normalizar(dados.getInteresse()));
        lead.setStatus(normalizar(dados.getStatus()));

        return ResponseEntity.ok(new LeadResponse(repository.save(lead)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id, HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByIdCadastroLeadAndCliente_Clinica_IdClinica(id, idClinica)
                .map(lead -> {
                    repository.delete(lead);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private Cliente buscarClienteDaClinica(Long idCliente, Long idClinica) {
        return clienteRepository
                .findByIdClienteAndClinica_IdClinica(idCliente, idClinica)
                .orElse(null);
    }

    private ResponseEntity<?> validar(LeadRequest dados) {
        if (dados == null
                || dados.getIdCliente() == null
                || dados.getInteresse() == null
                || dados.getInteresse().isBlank()
                || dados.getStatus() == null
                || dados.getStatus().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "mensagem",
                            "Cliente, interesse e status sao obrigatorios."));
        }

        String status = normalizar(dados.getStatus());
        if (!status.equals("ABERTO") && !status.equals("GANHO") && !status.equals("PERDIDO")) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Status deve ser ABERTO, GANHO ou PERDIDO."));
        }

        return null;
    }

    private ResponseEntity<?> erroClienteNaoEncontrado() {
        return ResponseEntity
                .badRequest()
                .body(Map.of("mensagem", "Cliente nao encontrado nesta clinica."));
    }

    private String normalizar(String valor) {
        return valor.trim().toUpperCase(Locale.ROOT);
    }
}
