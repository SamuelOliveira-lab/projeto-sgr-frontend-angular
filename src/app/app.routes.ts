import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MoradorCadastroComponent } from './pages/morador-cadastro/morador-cadastro.component';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { ContaComponent } from './pages/conta/conta.component';

export const routes: Routes = [
      {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
      {
        path: 'morador',
        component: MoradorCadastroComponent
      },
       {
        path: 'conta',
        component: ContaComponent
      },
      { path: 'saldo', component: SaldoComponent },
      { 
        path: '**', 
        redirectTo: '' 
      } 

     

];
