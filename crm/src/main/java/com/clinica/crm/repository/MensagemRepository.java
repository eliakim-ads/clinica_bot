package com.clinica.crm.repository;

import com.clinica.crm.entity.Mensagem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
    List<Mensagem> findByLead_IdCadastroLeadOrderByDataEnvioAsc(Long idLead);

    List<Mensagem> findByLead_Cliente_Clinica_IdClinicaOrderByDataEnvioAsc(Long idClinica);

    List<Mensagem> findByLead_IdCadastroLeadAndLead_Cliente_Clinica_IdClinicaOrderByDataEnvioAsc(
            Long idLead,
            Long idClinica);
}
