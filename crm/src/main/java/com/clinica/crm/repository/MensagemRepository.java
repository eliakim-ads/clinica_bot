package com.clinica.crm.repository;

import com.clinica.crm.entity.Mensagem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
    List<Mensagem> findByLead_IdCadastroLeadOrderByDataEnvioAsc(Long idLead);
}