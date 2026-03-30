import { Routes } from '@angular/router';

/**
 * Rotas do módulo de Ordem de Serviço (OS)
 * Essas rotas são lazy-loaded (carregadas sob demanda) na rota pai '/os'
 */
export const os_routes: Routes = [
  // Rota vazia: redireciona para 'listar'
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  
  {
    path: 'listar',
    loadComponent: () =>
      import('./os-listar/os-listar').then(m => m.OSListar)
  },
  
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./os-cadastro/os-cadastro').then(m => m.OSCadastro)
  }
];
