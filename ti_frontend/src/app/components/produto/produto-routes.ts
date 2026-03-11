import { Routes } from '@angular/router';

export const produto_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  {
    path: 'listar',
    loadComponent: () =>
      import('./produto-listar/produto-listar').then(m => m.ProdutoListar)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./produto-cadastro/produto-cadastro').then(m => m.ProdutoCadastro)
  }
];