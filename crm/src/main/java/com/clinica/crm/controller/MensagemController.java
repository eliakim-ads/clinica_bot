package com.clinica.crm.controller;

import com.clinica.crm.entity.Mensagem;
import com.clinica.crm.repository.MensagemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController// DEFINE QUE ESTA CLASSE É UM CONTROLADOR REST
@RequestMapping("/mensagens")   // DEFINE A URL PARA ESTE CONTROLADOR
public class MensagemController {

    private final MensagemRepository repository;

    public MensagemController(MensagemRepository repository) {
        this.repository = repository;
    }

    @PostMapping // DEFINE QUE ESTE MÉTODO RESPONDE A REQUISIÇÕES POST
    public Mensagem salvar(@RequestBody Mensagem mensagem) {
        return repository.save(mensagem);
    }

    @GetMapping // DEFINE QUE ESTE MÉTODO RESPONDE A REQUISIÇÕES GET

    public List<Mensagem> listar() {
        return repository.findAll();
    }
    @GetMapping("/lead/{id}") // DEFINE QUE ESTE MÉTODO RESPONDE A REQUISIÇÕES GET COM O CAMINHO /mensagens/lead/{id}
    public List<Mensagem> listarPorLead(@PathVariable Long id) {
        return repository.findByLead_IdCadastroLeadOrderByDataEnvioAsc(id);
    }
}