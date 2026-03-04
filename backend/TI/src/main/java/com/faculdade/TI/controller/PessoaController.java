package com.faculdade.TI.controller;

import com.faculdade.TI.infraestrutura.models.Pessoa;
import com.faculdade.TI.services.PessoaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoa")

public class PessoaController {

    private final PessoaService pessoaService;

    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @GetMapping("/listar")
    public List<Pessoa> listarTodosPessoa() {return pessoaService.listarTodosPessoas();}

    @PostMapping("/salvar-pessoa")
    public Pessoa salvarPessoa(@RequestBody Pessoa pessoa) {return pessoaService.salvarPessoa(pessoa);}

    @GetMapping("/buscar-pessoa/{id}")
    public Pessoa buscarPessoaPorId(@PathVariable Long id) {return pessoaService.buscarPessoaporId(id);}

    @DeleteMapping("/deletar-pessoa/{id}")
    public void deletarPessoaPorId(@PathVariable Long id){pessoaService.deletarPessoaPorId(id);}

    @PutMapping("/atualizar-pessoa/{id}")
    public Pessoa atualizarPessoaPorId(@PathVariable Long id, @RequestBody Pessoa pessoa) {
        return pessoaService.atualizarPessoaPorId(id, pessoa);}

}




