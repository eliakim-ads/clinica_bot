package com.clinica.crm.repository;

import com.clinica.crm.entity.MensagemAutomatica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MensagemAutomaticaRepository extends JpaRepository<MensagemAutomatica, Long> {
    MensagemAutomatica findByTipoAndAtivoTrueAndClinica_IdClinica(String tipo, Long idClinica);

    List<MensagemAutomatica> findByClinica_IdClinicaOrderByTipoAsc(Long idClinica);

    Optional<MensagemAutomatica> findByIdMsgAutoAndClinica_IdClinica(
            Long idMsgAuto,
            Long idClinica);

    boolean existsByTipoAndClinica_IdClinica(String tipo, Long idClinica);

    boolean existsByTipoAndClinica_IdClinicaAndIdMsgAutoNot(
            String tipo,
            Long idClinica,
            Long idMsgAuto);
}
