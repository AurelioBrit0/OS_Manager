package com.faculdade.TI.services;

import com.faculdade.TI.infraestrutura.models.Usuario;
import com.faculdade.TI.infraestrutura.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {


    public final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodosUsuarios() {return usuarioRepository.findAll();}

    public Usuario salvarUsuario(Usuario usuario) {return usuarioRepository.save(usuario);}

    public void deletarUsuarioPorID(Long id) {usuarioRepository.deleteById(id);}

    public Usuario buscarUsuarioPorID(Long id) {return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Id nao encontrado"));}

    public Usuario atualizarUsuarioPorId(Long id, Usuario usuarioAtualizada) {

        Usuario usuarioEntity = buscarUsuarioPorID(id);

        if (usuarioAtualizada.getEmail() != null) {
            usuarioEntity.setEmail(usuarioAtualizada.getEmail());
        }

        if (usuarioAtualizada.getSenha() != null) {
            usuarioEntity.setSenha(usuarioAtualizada.getSenha());
        }

        return usuarioRepository.save(usuarioEntity);
    }


}
