package com.faculdade.TI.infraestrutura.repository;

import com.faculdade.TI.infraestrutura.models.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Long> {

    boolean existsByNome(String nome);
}