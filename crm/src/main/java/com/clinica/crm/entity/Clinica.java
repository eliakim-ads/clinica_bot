package com.clinica.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "clinica") // nome da tabela no banco de dados
@Data
public class Clinica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClinica;

    private String nome;
    private String email;
    @JsonIgnore // Evita expor a senha no json, o que é um risco de segurança.
    private String senha;
    private String cnpj;
}
