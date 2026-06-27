package com.clinica.crm.repository;

import com.clinica.crm.entity.CadastroLead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CadastroLeadRepository extends JpaRepository<CadastroLead, Long> {
    Optional<CadastroLead> findTopByClienteIdClienteOrderByIdCadastroLeadDesc(Long idCliente);

    List<CadastroLead> findByCliente_Clinica_IdClinicaOrderByDataCriacaoDesc(Long idClinica);

    Optional<CadastroLead> findByIdCadastroLeadAndCliente_Clinica_IdClinica(
            Long idCadastroLead,
            Long idClinica);
}
