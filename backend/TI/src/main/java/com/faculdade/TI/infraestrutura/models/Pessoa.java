package com.faculdade.TI.infraestrutura.models;

import com.faculdade.TI.infraestrutura.Enum.FuncaoEnum;
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
@Table(name = "pessoa")
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(name = "cpf", unique = true)
    private String cpf;
    @Column(name = "cnpj", unique = true)
    private String cnpj;

    private String telefone;
    private String endereco;

    @Enumerated(EnumType.STRING)
    private FuncaoEnum funcao;

    @OneToOne(mappedBy = "pessoa")
    private Usuario usuario;

}
