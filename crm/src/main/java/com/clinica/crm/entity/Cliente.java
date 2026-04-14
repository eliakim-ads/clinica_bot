package com.clinica.crm.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "cliente") // nome da tabela no banco de dados
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;

    private String nome;
    private String telefone;

    private LocalDateTime dataCadastro;

    @ManyToOne
    @JoinColumn(name = "id_clinica")
    private Clinica clinica;
}
