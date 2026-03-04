package com.faculdade.TI.infraestrutura.repository;

import com.faculdade.TI.infraestrutura.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String Email);
}
