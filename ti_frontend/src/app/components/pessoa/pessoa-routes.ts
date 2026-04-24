import { Routes } from '@angular/router';

export const pessoa_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  {
    path: 'listar',
    loadComponent: () =>
      import('./pessoa-listar/pessoa-listar').then(m => m.PessoaListar)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pessoa-cadastro/pessoa-cadastro').then(m => m.PessoaCadastro)
  }
];