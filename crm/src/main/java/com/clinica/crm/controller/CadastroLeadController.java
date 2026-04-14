package com.clinica.crm.controller;

import com.clinica.crm.entity.CadastroLead;
import com.clinica.crm.repository.CadastroLeadRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leads") // DEFINE A URL PARA ESTE CONTROLADOR
public class CadastroLeadController {

    private final CadastroLeadRepository repository;

    public CadastroLeadController(CadastroLeadRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public CadastroLead salvar(@RequestBody CadastroLead lead) {
        return repository.save(lead);
    }

    //    @PostMapping 
//    public CadastroLead salvar(@RequestBody CadastroLead lead) {
//
//    Cliente cliente = clienteRepository
//        .findById(lead.getCliente().getIdCliente())
//        .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
//
//    lead.setCliente(cliente);
//
//    return repository.save(lead);
//}

    @GetMapping
    public List<CadastroLead> listar() {
        return repository.findAll();
    }
}
