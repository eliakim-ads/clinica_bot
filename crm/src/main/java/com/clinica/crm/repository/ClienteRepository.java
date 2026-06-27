package com.clinica.crm.repository;


import com.clinica.crm.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Cliente findByTelefone(String telefone);
    List<Cliente> findByClinica_IdClinicaOrderByNomeAsc(Long idClinica);
    Optional<Cliente> findByIdClienteAndClinica_IdClinica(Long idCliente, Long idClinica);
    boolean existsByIdClienteAndClinica_IdClinica(Long idCliente, Long idClinica);
}
