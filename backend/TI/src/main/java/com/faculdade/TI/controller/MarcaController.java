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
}
