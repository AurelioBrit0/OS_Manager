package com.faculdade.TI.controller;

import com.faculdade.TI.infraestrutura.models.Usuario;
import com.faculdade.TI.services.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")

public class UsuarioController {

    private final UsuarioService usuarioService;
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/listar")
    public List<Usuario> listarTodosUsuarios() {return usuarioService.listarTodosUsuarios();}

    @PostMapping("/salvar-usuario")
    public Usuario salvarUsuario(@RequestBody Usuario usuario) {return usuarioService.salvarUsuario(usuario);}

    @GetMapping("/buscar-usuario/{id}")
    public Usuario buscarUsuarioPorID(@PathVariable Long id) {return usuarioService.buscarUsuarioPorID(id);}

    @DeleteMapping("/deletar-usuario/{id}")
    public void deletarUsuarioPorID(@PathVariable Long id) {usuarioService.deletarUsuarioPorID(id);}

    @PutMapping("/atualizar-usuario/{id}")
    public Usuario atualizarUsuarioPorID(@PathVariable Long id, @RequestBody Usuario usuario) {return usuarioService.atualizarUsuarioPorId(id, usuario);}


}
