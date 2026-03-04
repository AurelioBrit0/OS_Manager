package com.faculdade.TI.services;

import com.faculdade.TI.infraestrutura.models.OS;
import com.faculdade.TI.infraestrutura.models.Produtos;
import com.faculdade.TI.infraestrutura.repository.OsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OsService {

    final OsRepository osrepository;
    public OsService(OsRepository repository) {
        this.osrepository = repository;
    }

    public List<OS> listarTodasOs (){return osrepository.findAll();}

    public OS salvarOs(OS os){return osrepository.save(os);}

    public void deletarOsPorId(Long id){osrepository.deleteById(id);}

    public OS buscarOsPorId(Long id){return osrepository.findById(id).orElseThrow(() -> new RuntimeException("Id nao encontrado"));}

    public OS atualizarOsPorId(Long id, OS OsAtualizada) {

        OS osExistente = buscarOsPorId(id);

        BeanUtils.copyProperties(OsAtualizada, osExistente, "id");

        return osrepository.save(osExistente);
    }


}
