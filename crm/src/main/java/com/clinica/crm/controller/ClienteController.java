package com.clinica.crm.controller;

import com.clinica.crm.entity.Clinica;
import com.clinica.crm.entity.Cliente;
import com.clinica.crm.repository.ClienteRepository;
import com.clinica.crm.service.ClinicaContextService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/clientes") // DEFINE A URL PARA ESTE CONTROLADOR
public class ClienteController {

    private final ClienteRepository repository;
    private final ClinicaContextService clinicaContextService;

    public ClienteController(ClienteRepository repository, ClinicaContextService clinicaContextService) {
        this.repository = repository;
        this.clinicaContextService = clinicaContextService;
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Cliente cliente, HttpServletRequest request) {
        if (cliente.getNome() == null || cliente.getNome().isBlank()
                || cliente.getTelefone() == null || cliente.getTelefone().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Nome e telefone sao obrigatorios."));
        }

        Clinica clinica = clinicaContextService.getClinicaAutenticada(request);

        cliente.setNome(cliente.getNome().trim());
        cliente.setTelefone(cliente.getTelefone().trim());
        cliente.setDataCadastro(LocalDateTime.now());
        cliente.setClinica(clinica);

        Cliente clienteSalvo = repository.save(cliente);
        return ResponseEntity.ok(clienteSalvo);
    }

    @GetMapping
    public List<Cliente> listar(HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);
        return repository.findByClinica_IdClinicaOrderByNomeAsc(idClinica);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id, HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByIdClienteAndClinica_IdClinica(id, idClinica)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity
                        .notFound()
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Cliente dadosAtualizados, HttpServletRequest request) {
        if (dadosAtualizados.getNome() == null || dadosAtualizados.getNome().isBlank()
                || dadosAtualizados.getTelefone() == null || dadosAtualizados.getTelefone().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Nome e telefone sao obrigatorios."));
        }

        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        return repository.findByIdClienteAndClinica_IdClinica(id, idClinica)
                .<ResponseEntity<?>>map(cliente -> {
                    cliente.setNome(dadosAtualizados.getNome().trim());
                    cliente.setTelefone(dadosAtualizados.getTelefone().trim());

                    Cliente clienteAtualizado = repository.save(cliente);
                    return ResponseEntity.ok(clienteAtualizado);
                })
                .orElseGet(() -> ResponseEntity
                        .notFound()
                        .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id, HttpServletRequest request) {
        Long idClinica = clinicaContextService.getIdClinicaAutenticada(request);

        if (!repository.existsByIdClienteAndClinica_IdClinica(id, idClinica)) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
