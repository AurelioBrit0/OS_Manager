package com.faculdade.TI.infraestrutura.repository;

import com.faculdade.TI.infraestrutura.models.Produtos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produtos, Long> {
    Produtos findByNome(String Nome);
}
