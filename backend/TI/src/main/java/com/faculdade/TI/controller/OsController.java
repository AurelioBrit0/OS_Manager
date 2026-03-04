package com.faculdade.TI.controller;


import com.faculdade.TI.infraestrutura.models.OS;
    import com.faculdade.TI.services.OsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/os")
public class OsController {

    private final OsService osService;
    public OsController(OsService osService) {this.osService = osService;}

    @GetMapping("/listar")
    public List<OS> listarOs(){return osService.listarTodasOs();}

    @PostMapping("/salvar-os")
    public OS salvarOs(@RequestBody OS os){return osService.salvarOs(os);}

    @GetMapping("/buscar-os/{id}")
    public OS buscarOsPorId(@PathVariable Long id) {return osService.buscarOsPorId(id);}

    @DeleteMapping("/deletar-os/{id}")
    public void deletarOsPorId(@PathVariable Long id){osService.deletarOsPorId(id);}

    @PutMapping("/atualizar-os/{id}")
    public OS atualizarOsPorId(@PathVariable Long id, @RequestBody OS os) {
        return osService.atualizarOsPorId(id, os);}


}
