import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Produto } from './components/produto/produto';

export const routes: Routes = [

    {
        path: "home",
        component: Home
    },

    {
        path: "produto",
        component: Produto
    }

];
