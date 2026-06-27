package com.clinica.crm.dto;

import java.time.LocalDateTime;

import com.clinica.crm.entity.CadastroLead;

public class LeadResponse {

    private final Long idCadastroLead;
    private final Long idCliente;
    private final String nome;
    private final String telefone;
    private final String interesse;
    private final String status;
    private final LocalDateTime dataCriacao;

    public LeadResponse(CadastroLead lead) {
        this.idCadastroLead = lead.getIdCadastroLead();
        this.idCliente = lead.getCliente().getIdCliente();
        this.nome = lead.getCliente().getNome();
        this.telefone = lead.getCliente().getTelefone();
        this.interesse = lead.getInteresse();
        this.status = lead.getStatus();
        this.dataCriacao = lead.getDataCriacao();
    }

    public Long getIdCadastroLead() {
        return idCadastroLead;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public String getNome() {
        return nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getInteresse() {
        return interesse;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
}
