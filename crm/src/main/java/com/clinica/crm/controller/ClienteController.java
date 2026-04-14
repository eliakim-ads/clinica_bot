package com.clinica.crm.controller;

import com.clinica.crm.entity.Cliente;
import com.clinica.crm.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes") // DEFINE A URL PARA ESTE CONTROLADOR
public class ClienteController {

    private final ClienteRepository repository;

    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Cliente salvar(@RequestBody Cliente cliente) {
        return repository.save(cliente);
    }




    @GetMapping
    public List<Cliente> listar() {
        return repository.findAll();
    }
}