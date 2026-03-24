import { Routes } from '@angular/router';

/**
 * Rotas do módulo de marca
 * Essas rotas são lazy-loaded (carregadas sob demanda) na rota pai '/marca'
 * 
 * Estrutura:
 * /marca (pai no app.routes.ts)
 *   ├─ /marca/ (vazio) → redireciona para /marca/listar
 *   ├─ /marca/listar → carrega componente MarcaListar
 *   └─ /marca/cadastro → carrega componente MarcaCadastro
 */
export const marca_routes: Routes = [
  // Rota vazia: redireciona para 'listar'
  // pathMatch: 'full' = rota deve corresponder exatamente
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  
  {
    path: 'listar',
    // loadComponent = carregamento lazy do componente (só carrega quando acessado)
    loadComponent: () =>
      import('./marca-listar/marca-listar').then(m => m.MarcaListar)
  },
  
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./marca-cadastro/marca-cadastro').then(m => m.MarcaCadastro)
  }
];
