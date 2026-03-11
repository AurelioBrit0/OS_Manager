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
  
];
