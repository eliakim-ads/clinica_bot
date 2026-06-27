package com.clinica.crm.dto;

public class LoginResponse {

    private Long idClinica;
    private String nome;
    private String email;
    private String token;

    public LoginResponse(Long idClinica, String nome, String email, String token) {
        this.idClinica = idClinica;
        this.nome = nome;
        this.email = email;
        this.token = token;
    }

    public Long getIdClinica() {
        return idClinica;
    }

    public void setIdClinica(Long idClinica) {
        this.idClinica = idClinica;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
