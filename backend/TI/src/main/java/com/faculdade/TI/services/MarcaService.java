package com.faculdade.TI.services;

import com.faculdade.TI.infraestrutura.models.Marca;
import com.faculdade.TI.infraestrutura.repository.MarcaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaService {

    private final MarcaRepository marcaRepository;

    public MarcaService(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    public List<Marca> listar() {
        return marcaRepository.findAll();
    }

    public Marca salvar(Marca marca) {
        return marcaRepository.save(marca);
    }

    public Marca buscarOuCriar(String nome) {
        return marcaRepository.findAll().stream()
                .filter(m -> m.getNome().equalsIgnoreCase(nome))
                .findFirst()
                .orElseGet(() -> marcaRepository.save(new Marca(null, nome)));
    }
}
