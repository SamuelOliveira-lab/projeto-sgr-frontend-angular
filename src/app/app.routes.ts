import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MoradorCadastroComponent } from './pages/morador-cadastro/morador-cadastro.component';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { ContaComponent } from './pages/conta/conta.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PainelComponent } from './pages/painel/painel.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'morador', component: MoradorCadastroComponent },
      { path: 'conta', component: ContaComponent },
      { path: 'saldo', component: SaldoComponent },
      { path: 'extrato', component: ExtratoComponent },
      { path: 'painel', component: PainelComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
