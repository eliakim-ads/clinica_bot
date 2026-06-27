package com.clinica.crm.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica.crm.dto.LoginRequest;
import com.clinica.crm.dto.LoginResponse;
import com.clinica.crm.entity.Clinica;
import com.clinica.crm.repository.ClinicaRepository;
import com.clinica.crm.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final ClinicaRepository clinicaRepository;
    private final JwtService jwtService;

    public AuthController(ClinicaRepository clinicaRepository, JwtService jwtService) {
        this.clinicaRepository = clinicaRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()
                || request.getSenha() == null || request.getSenha().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Email e senha sao obrigatorios."));
        }

        Clinica clinica = clinicaRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (clinica == null || clinica.getSenha() == null || !clinica.getSenha().equals(request.getSenha())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("mensagem", "Usuario ou senha invalidos."));
        }

        String token = jwtService.gerarToken(clinica.getIdClinica(), clinica.getEmail());

        LoginResponse response = new LoginResponse(
                clinica.getIdClinica(),
                clinica.getNome(),
                clinica.getEmail(),
                token);

        return ResponseEntity.ok(response);
    }
}
