package com.faculdade.TI.controller;

import com.faculdade.TI.infraestrutura.models.Produtos;
import com.faculdade.TI.services.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/listar")
    public List<Produtos> listarTodosProdutos() {return produtoService.listarTodosProdutos();}

    @PostMapping("/salvar-produto")
    public Produtos salvarProduto(@RequestBody Produtos produtos) {return produtoService.salvarProduto(produtos);}

    @GetMapping("/buscar-produto/{id}")
    public Produtos buscarProdutoPorId(@PathVariable Long id) {return produtoService.buscarProdutoPorId(id);}

    @DeleteMapping("/deletar-produto/{id}")
    public void deletarProdutoPorId(@PathVariable Long id){produtoService.deletarProdutoPorId(id);}

    @PutMapping("/atualizar-produto/{id}")
    public Produtos atualizarProdutoPorId(@PathVariable Long id, @RequestBody Produtos produto) {
        return produtoService.atualizarProdutoPorId(id, produto);}
}
