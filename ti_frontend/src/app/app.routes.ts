import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
    
    {
        path: "home",
        component: Home
    },
     {
    path: 'produto',
    loadChildren: () =>
      import('./components/produto/produto-routes')
        .then(m => m.produto_routes)
  },
  {
    path: 'marca',
    loadChildren: () =>
      import('./components/marca/marca-routes')
        .then(m => m.marca_routes)
  },
  {
    path: 'os',
    loadChildren: () =>
      import('./components/os/os-routes')
        .then(m => m.os_routes)
  },
  {
    path: 'pessoa',
    loadChildren: () =>
      import('./components/pessoa/pessoa-routes')
        .then(m => m.pessoa_routes)
  },
  
];
