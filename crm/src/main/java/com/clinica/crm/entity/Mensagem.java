package com.clinica.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity // Indica que esta classe é uma entidade JPA
@Table(name = "mensagem") // nome da tabela no banco de dados
@Data // Lombok para gerar getters, setters, equals, hashCode e toString automaticamente
public class Mensagem {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY)// Geração automática do ID
    private Long idMensagem;

    private String conteudo;
    private String origem; // CLIENTE ou BOT

    private LocalDateTime dataEnvio;

    @ManyToOne // Relacionamento com CadastroLead
    @JoinColumn(name = "id_lead") // Chave estrangeira para CadastroLead
    @JsonIgnore // Evita referência circular na serialização JSON
    private CadastroLead lead;
}
