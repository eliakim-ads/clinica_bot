package com.clinica.crm.dto;

import java.time.LocalDateTime;

import com.clinica.crm.entity.Mensagem;

public class MensagemResponse {

    private final Long idMensagem;
    private final Long idLead;
    private final String conteudo;
    private final String origem;
    private final LocalDateTime dataEnvio;

    public MensagemResponse(Mensagem mensagem) {
        this.idMensagem = mensagem.getIdMensagem();
        this.idLead = mensagem.getLead().getIdCadastroLead();
        this.conteudo = mensagem.getConteudo();
        this.origem = mensagem.getOrigem();
        this.dataEnvio = mensagem.getDataEnvio();
    }

    public Long getIdMensagem() {
        return idMensagem;
    }

    public Long getIdLead() {
        return idLead;
    }

    public String getConteudo() {
        return conteudo;
    }

    public String getOrigem() {
        return origem;
    }

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }
}
