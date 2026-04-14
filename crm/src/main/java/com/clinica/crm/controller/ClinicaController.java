package com.clinica.crm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica.crm.entity.Clinica;
import com.clinica.crm.repository.ClinicaRepository;

@RestController
@RequestMapping("/clinicas") // DEFINE A URL PARA ESTE CONTROLADOR
public class ClinicaController {

    private final ClinicaRepository repository;

    public ClinicaController(ClinicaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Clinica salvar(@RequestBody Clinica clinica) {
        return repository.save(clinica);
    }

    @GetMapping
    public List<Clinica> listar() {
        return repository.findAll();
    }
}