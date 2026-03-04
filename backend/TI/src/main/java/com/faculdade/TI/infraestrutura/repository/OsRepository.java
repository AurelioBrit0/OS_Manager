package com.faculdade.TI.infraestrutura.repository;

import com.faculdade.TI.infraestrutura.models.OS;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OsRepository extends JpaRepository<OS, Long> {
        OS findByTitulo(String Titulo);
}
