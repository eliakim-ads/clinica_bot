package com.clinica.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "clinica") // nome da tabela no banco de dados
@Data
public class Clinica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClinica;

    private String nome;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // para não expor a senha na resposta JSON
    private String senha;
    private String cnpj;
    private String telefone;
}
