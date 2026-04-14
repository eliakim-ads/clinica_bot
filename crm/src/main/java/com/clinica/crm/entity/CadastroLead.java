package com.clinica.crm.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "cadastro_lead") // nome da tabela no banco de dados
@Data
public class CadastroLead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCadastroLead;

    private String interesse;
    private String status;

    private LocalDateTime dataCriacao;

    @ManyToOne // Relacinamento com o Cliente
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
}
