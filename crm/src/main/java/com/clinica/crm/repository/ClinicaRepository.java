package com.clinica.crm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.clinica.crm.entity.Clinica;

public interface ClinicaRepository extends JpaRepository<Clinica, Long> {
    Optional<Clinica> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCnpj(String cnpj);
}
