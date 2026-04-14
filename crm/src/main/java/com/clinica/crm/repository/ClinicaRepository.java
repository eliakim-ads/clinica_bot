package com.clinica.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.clinica.crm.entity.Clinica;

public interface ClinicaRepository extends JpaRepository<Clinica, Long> {
}
