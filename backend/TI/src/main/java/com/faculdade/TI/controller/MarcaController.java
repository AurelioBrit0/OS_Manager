package com.faculdade.TI.controller;

import com.faculdade.TI.infraestrutura.models.Marca;
import com.faculdade.TI.services.MarcaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/marca")

public class MarcaController {

    private final MarcaService marcaService;

    public MarcaController(MarcaService marcaService) {
        this.marcaService = marcaService;
    }

    @GetMapping("/listar")
    public List<Marca> listarTodasasMarcas() {
        return marcaService.listar();
    }

    @PostMapping("/salvar-marca")
    public Marca salvarMarca (@RequestBody Marca marca) {
        return marcaService.salvar(marca);
    }

    @GetMapping("/buscar-marca/{id}")
    public Marca buscarMarcaPorId(@PathVariable Long id) {return marcaService.buscarMarcaPorId(id);}

    @DeleteMapping("/deletar-marca/{id}")
    public void deletarMarcaPorId(@PathVariable Long id){marcaService.deletarMarcaPorId(id);}

    @PutMapping("/atualizar-marca/{id}")
    public Marca atualizarMarcaPorId(@PathVariable Long id, @RequestBody Marca marca) {
        return marcaService.atualizarMarcaPorId(id, marca);}

}
