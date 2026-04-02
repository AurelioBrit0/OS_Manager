package com.faculdade.TI.infraestrutura.models;

import com.faculdade.TI.infraestrutura.Enum.StatusEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "os")
public class OS {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataAbertura;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime horaAbertura;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataFechamento;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime horaFechamento;

    private String comentario;
    private double valor;

    @ManyToOne
    private Produtos produto;

    @ManyToOne
    private Pessoa pessoa;

    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @PrePersist
    public void aoAbrirOS() {
        // Só preenche automaticamente se for uma nova OS e não enviamos datas manuais
        if (this.dataAbertura == null) {
            this.dataAbertura = LocalDate.now();
        }
        if (this.horaAbertura == null) {
            this.horaAbertura = LocalTime.now();
        }
        if (this.status == null) {
            this.status = StatusEnum.NOVO;
        }
    }


}


