package com.faculdade.TI.services;

import com.faculdade.TI.infraestrutura.models.Pessoa;
import com.faculdade.TI.infraestrutura.repository.PessoaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {

   private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository repository) {
        this.pessoaRepository = repository;
    }

    public List<Pessoa> listarTodosPessoas() {
        return pessoaRepository.findAll();
    }

    public Pessoa salvarPessoa (Pessoa pessoa){return pessoaRepository.save(pessoa);}


    public Pessoa buscarPessoaporId (Long id){
        return pessoaRepository.findById(id).orElseThrow(() -> new RuntimeException("ID não encontrado"));
    }

    public void deletarPessoaPorId (Long id) { pessoaRepository.deleteById(id);}

    public Pessoa atualizarPessoaPorId(Long id, Pessoa pessoaAtualizada) {

        Pessoa pessoaExistente = buscarPessoaporId(id);

        BeanUtils.copyProperties(pessoaAtualizada, pessoaExistente, "id");

        return pessoaRepository.save(pessoaExistente);
    }

}


