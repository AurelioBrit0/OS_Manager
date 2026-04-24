package com.faculdade.TI.infraestrutura.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String senha;
    private String nomeUsuario;

    @OneToOne
    @JoinColumn(name = "pessoa_id") // FK para a tabela pessoa
    private Pessoa pessoa;


}
