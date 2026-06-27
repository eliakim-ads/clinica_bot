package com.clinica.crm.controller;

import com.clinica.crm.dto.MensagemAutomaticaRequest;
import com.clinica.crm.dto.MensagemAutomaticaResponse;
import com.clinica.crm.entity.Clinica;
import com.clinica.crm.entity.MensagemAutomatica;
import com.clinica.crm.repository.MensagemAutomaticaRepository;
import com.clinica.crm.service.ChatbotService;
import com.clinica.crm.service.ClinicaContextService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/mensagens-automaticas")
public class MensagemAutomaticaController {

    private final MensagemAutomaticaRepository repository;
    private final ChatbotService chatbotService;
    private final ClinicaContextService clinicaContextService;

    public MensagemAutomaticaController(
            MensagemAutomaticaRepository repository,
            ChatbotService chatbotService,
            ClinicaContextService clinicaContextService) {
        this.repository = repository;
        this.chatbotService = chatbotService;
        this.clinicaContextService = clinicaContextService;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody MensagemAutomaticaRequest dados,
            HttpServletRequest request) {
        ResponseEntity<?> erroValidacao = validar(dados);
        if (erroValidacao != null) {
            return erroValidacao;
        }

        Clinica clinica = clinicaContextService.getClinicaAutenticada(request);
        String tipo = normalizarTipo(dados.getTipo());

        if (repository.existsByTipoAndClinica_IdClinica(tipo, clinica.getIdClinica())) {
            return erroTipoDuplicado();
        }

        MensagemAutomatica mensagem = new MensagemAutomatica();
        aplicarDados(mensagem, dados);
        mensagem.setClinica(clinica);

        return ResponseEntity.ok(new MensagemAutomaticaResponse(repository.save(mensagem)));
    }

    @GetMapping
    public List<MensagemAutomaticaResponse> listar(HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByClinica_IdClinicaOrderByTipoAsc(idClinica)
                .stream()
                .map(MensagemAutomaticaResponse::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MensagemAutomaticaResponse> buscarPorId(
            @PathVariable Long id,
            HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByIdMsgAutoAndClinica_IdClinica(id, idClinica)
                .map(MensagemAutomaticaResponse::new)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody MensagemAutomaticaRequest dados,
            HttpServletRequest request) {
        ResponseEntity<?> erroValidacao = validar(dados);
        if (erroValidacao != null) {
            return erroValidacao;
        }

        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);
        MensagemAutomatica mensagem = repository
                .findByIdMsgAutoAndClinica_IdClinica(id, idClinica)
                .orElse(null);

        if (mensagem == null) {
            return ResponseEntity.notFound().build();
        }

        String tipo = normalizarTipo(dados.getTipo());
        if (repository.existsByTipoAndClinica_IdClinicaAndIdMsgAutoNot(
                tipo,
                idClinica,
                id)) {
            return erroTipoDuplicado();
        }

        aplicarDados(mensagem, dados);
        return ResponseEntity.ok(new MensagemAutomaticaResponse(repository.save(mensagem)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id, HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByIdMsgAutoAndClinica_IdClinica(id, idClinica)
                .map(mensagem -> {
                    repository.delete(mensagem);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/resposta")
    public ResponseEntity<MensagemAutomaticaResponse> respostaAutomatica(
            @RequestParam String tipo,
            @RequestParam(name = "idClinica", required = false) Long idClinicaIgnorada,
            HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);
        MensagemAutomatica mensagem = repository
                .findByTipoAndAtivoTrueAndClinica_IdClinica(normalizarTipo(tipo), idClinica);

        if (mensagem == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new MensagemAutomaticaResponse(mensagem));
    }

    @GetMapping("/auto")
    public ResponseEntity<?> respostaAuto(
            @RequestParam String mensagem,
            @RequestParam(name = "idClinica", required = false) Long idClinicaIgnorada,
            HttpServletRequest request) {
        if (mensagem == null || mensagem.isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Mensagem nao pode ser vazia."));
        }

        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);
        String tipo = chatbotService.detectarTipo(mensagem);
        MensagemAutomatica resposta = repository
                .findByTipoAndAtivoTrueAndClinica_IdClinica(tipo, idClinica);

        if (resposta == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new MensagemAutomaticaResponse(resposta));
    }

    private ResponseEntity<?> validar(MensagemAutomaticaRequest dados) {
        if (dados == null
                || dados.getTipo() == null
                || dados.getTipo().isBlank()
                || dados.getConteudo() == null
                || dados.getConteudo().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Tipo e conteudo sao obrigatorios."));
        }

        return null;
    }

    private void aplicarDados(
            MensagemAutomatica mensagem,
            MensagemAutomaticaRequest dados) {
        mensagem.setTipo(normalizarTipo(dados.getTipo()));
        mensagem.setConteudo(dados.getConteudo().trim());
        mensagem.setAtivo(dados.getAtivo() == null || dados.getAtivo());
    }

    private ResponseEntity<?> erroTipoDuplicado() {
        return ResponseEntity
                .badRequest()
                .body(Map.of("mensagem", "Ja existe uma mensagem com este tipo na clinica."));
    }

    private String normalizarTipo(String tipo) {
        return tipo.trim().toUpperCase(Locale.ROOT);
    }
}
