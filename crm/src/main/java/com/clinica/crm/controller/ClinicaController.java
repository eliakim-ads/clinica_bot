package com.clinica.crm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> salvar(@RequestBody Clinica clinica) {
        if (clinica.getNome() == null || clinica.getNome().isBlank()
                || clinica.getEmail() == null || clinica.getEmail().isBlank()
                || clinica.getSenha() == null || clinica.getSenha().isBlank()
                || clinica.getCnpj() == null || clinica.getCnpj().isBlank()
                || clinica.getTelefone() == null || clinica.getTelefone().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Preencha todos os campos obrigatorios."));
        }

        clinica.setNome(clinica.getNome().trim());
        clinica.setEmail(clinica.getEmail().trim().toLowerCase());
        clinica.setCnpj(clinica.getCnpj().trim());
        clinica.setTelefone(clinica.getTelefone().trim());

        if (repository.existsByEmail(clinica.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Ja existe uma clinica cadastrada com este email."));
        }

        if (repository.existsByCnpj(clinica.getCnpj())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Ja existe uma clinica cadastrada com este CNPJ."));
        }

        Clinica clinicaSalva = repository.save(clinica);
        return ResponseEntity.ok(clinicaSalva);
    }

    @GetMapping
    public List<Clinica> listar() {
        return repository.findAll();
    }
}
