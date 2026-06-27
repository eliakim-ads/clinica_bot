package com.clinica.crm.service;

import org.springframework.stereotype.Service;

import com.clinica.crm.entity.Clinica;
import com.clinica.crm.repository.ClinicaRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ClinicaContextService {

    private final JwtService jwtService;
    private final ClinicaRepository clinicaRepository;

    public ClinicaContextService(JwtService jwtService, ClinicaRepository clinicaRepository) {
        this.jwtService = jwtService;
        this.clinicaRepository = clinicaRepository;
    }

    public Clinica getClinicaAutenticada(HttpServletRequest request) {
        String token = extrairBearerToken(request);
        Long idClinica = jwtService.extrairIdClinica(token);

        return clinicaRepository.findById(idClinica)
                .orElseThrow(() -> new IllegalArgumentException("Clinica autenticada nao encontrada."));
    }

    public Long getIdClinicaAutenticada(HttpServletRequest request) {
        return getClinicaAutenticada(request).getIdClinica();
    }

    private String extrairBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Token de autenticacao nao informado.");
        }

        return authorization.substring(7);
    }
}
