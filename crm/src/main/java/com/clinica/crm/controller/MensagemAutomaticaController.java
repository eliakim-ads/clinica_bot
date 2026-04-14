package com.clinica.crm.controller;

import com.clinica.crm.entity.MensagemAutomatica;
import com.clinica.crm.repository.MensagemAutomaticaRepository;
import com.clinica.crm.service.ChatbotService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mensagens-automaticas")
public class MensagemAutomaticaController {

    private final MensagemAutomaticaRepository repository;
    private final ChatbotService chatbotService; //  chatbot para detectar tipo de mensagem

    public MensagemAutomaticaController(
            MensagemAutomaticaRepository repository,
            ChatbotService chatbotService) {

        this.repository = repository;
        this.chatbotService = chatbotService;
    }

    // CRUD
    @PostMapping
    public MensagemAutomatica salvar(@RequestBody MensagemAutomatica msg) {
        return repository.save(msg);
    }

    @GetMapping
    public List<MensagemAutomatica> listar() {
        return repository.findAll();
    }

    // BUSCA DIRETA POR TIPO
    @GetMapping("/resposta")
    public MensagemAutomatica respostaAutomatica(
            @RequestParam String tipo,
            @RequestParam Long idClinica) {

        MensagemAutomatica msg = repository.findByTipoAndAtivoTrueAndClinica_IdClinica(tipo, idClinica);

        if (msg == null) {
            throw new RuntimeException("Mensagem automática não encontrada");
        }

        return msg;
    }

    // BUSCA INTELIGENTE (CHATBOT)
    @GetMapping("/auto")
    public MensagemAutomatica respostaAuto(
            @RequestParam String mensagem,
            @RequestParam Long idClinica) {

        // agora via service
        String tipo = chatbotService.detectarTipo(mensagem);

        System.out.println("Tipo detectado: " + tipo); // debug opcional

        MensagemAutomatica msg = repository
                .findByTipoAndAtivoTrueAndClinica_IdClinica(tipo, idClinica);

        if (msg == null) {
            throw new RuntimeException("Nenhuma resposta encontrada para o tipo: " + tipo);
        }

        return msg;
    }
}