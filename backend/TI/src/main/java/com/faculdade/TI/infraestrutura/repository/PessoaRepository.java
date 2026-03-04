package com.faculdade.TI.infraestrutura.repository;

import com.faculdade.TI.infraestrutura.models.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    Pessoa findByNome(String Nome);

}


