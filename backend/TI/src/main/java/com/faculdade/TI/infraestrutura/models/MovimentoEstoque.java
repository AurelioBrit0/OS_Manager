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
@Table(name = "movimentoestoque")
public class MovimentoEstoque {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Produtos produto;
    private double estoqueAnterior;
    private double quantidade;
    private String tipomovimento;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produtos getProduto() {
        return produto;
    }

    public void setProduto(Produtos produto) {
        this.produto = produto;
    }

    public double getEstoqueAnterior() {
        return estoqueAnterior;
    }

    public void setEstoqueAnterior(double estoqueAnterior) {
        this.estoqueAnterior = estoqueAnterior;
    }

    public double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(double quantidade) {
        this.quantidade = quantidade;
    }

    public String getTipomovimento() {
        return tipomovimento;
    }

    public void setTipomovimento(String tipomovimento) {
        this.tipomovimento = tipomovimento;
    }
}
