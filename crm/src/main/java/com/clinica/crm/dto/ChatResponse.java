package com.clinica.crm.dto;

import java.time.LocalDateTime;

public class ChatResponse {

    private String mensagemCliente;
    private String mensagemBot;
    private String tipo;

    private String nomeCliente;
    private String nomeClinica;

    private LocalDateTime dataHora;

    // getters e setters

    public String getMensagemCliente() {
        return mensagemCliente;
    }

    public void setMensagemCliente(String mensagemCliente) {
        this.mensagemCliente = mensagemCliente;
    }

    public String getMensagemBot() {
        return mensagemBot;
    }

    public void setMensagemBot(String mensagemBot) {
        this.mensagemBot = mensagemBot;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getNomeClinica() {
        return nomeClinica;
    }

    public void setNomeClinica(String nomeClinica) {
        this.nomeClinica = nomeClinica;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
}