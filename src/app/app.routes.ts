import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)},
    {path: 'employee', loadChildren: () => import('./modules/employee/routes').then(m => m.routes)},
];
