package com.clinica.crm.dto;

import com.clinica.crm.entity.MensagemAutomatica;

public class MensagemAutomaticaResponse {

    private final Long idMsgAuto;
    private final String tipo;
    private final String conteudo;
    private final Boolean ativo;

    public MensagemAutomaticaResponse(MensagemAutomatica mensagem) {
        this.idMsgAuto = mensagem.getIdMsgAuto();
        this.tipo = mensagem.getTipo();
        this.conteudo = mensagem.getConteudo();
        this.ativo = mensagem.getAtivo();
    }

    public Long getIdMsgAuto() {
        return idMsgAuto;
    }

    public String getTipo() {
        return tipo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public Boolean getAtivo() {
        return ativo;
    }
}
