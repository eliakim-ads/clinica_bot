package com.clinica.crm.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteController {

    @GetMapping("/teste") // DEFINE A URL PARA ESTE CONTROLADOR
    public String teste() {
        return "API funcionando 🚀";
    }
}
