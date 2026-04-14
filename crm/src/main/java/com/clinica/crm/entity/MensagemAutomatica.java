package com.clinica.crm.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "mensagem_automatica")
@Data
public class MensagemAutomatica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMsgAuto;

    private String tipo;

    private String conteudo;

    private Boolean ativo;

    @ManyToOne // Relacionamento com Clinica para Sistema multi-tenant 
    private Clinica clinica;
}