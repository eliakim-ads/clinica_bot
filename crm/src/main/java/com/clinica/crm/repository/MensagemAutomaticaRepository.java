package com.clinica.crm.repository;

import com.clinica.crm.entity.MensagemAutomatica;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MensagemAutomaticaRepository extends JpaRepository<MensagemAutomatica, Long> {
    MensagemAutomatica findByTipoAndAtivoTrueAndClinica_IdClinica(String tipo, Long idClinica);
    Optional<MensagemAutomatica> findByTipo(String tipo);
}
