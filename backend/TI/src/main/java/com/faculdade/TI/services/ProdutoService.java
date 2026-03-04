package com.faculdade.TI.services;

import com.faculdade.TI.infraestrutura.models.Produtos;
import com.faculdade.TI.infraestrutura.repository.ProdutoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository repository) {
        this.produtoRepository = repository;
    }

    public List<Produtos> listarTodosProdutos() {
        return produtoRepository.findAll();
    }

    public Produtos salvarProduto (Produtos produto){return produtoRepository.save(produto);}


    public Produtos buscarProdutoPorId (Long id){
        return produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("ID não encontrado"));
    }

    public void deletarProdutoPorId (Long id) { produtoRepository.deleteById(id);}

    public Produtos atualizarProdutoPorId(Long id, Produtos produtoAtualizada) {

        Produtos produtoExistente = buscarProdutoPorId(id);

        BeanUtils.copyProperties(produtoAtualizada, produtoExistente, "id");

        return produtoRepository.save(produtoExistente);
    }


}
