package com.clinica.crm.dto;

public class LoginResponse {

    private Long idClinica;
    private String nome;
    private String email;

    public LoginResponse(Long idClinica, String nome, String email) {
        this.idClinica = idClinica;
        this.nome = nome;
        this.email = email;
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
}
