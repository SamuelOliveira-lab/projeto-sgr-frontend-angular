import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.css'
})
export class ExtratoComponent {
  moradores = [
    { id: 1, nome: 'Samuel' },
    { id: 2, nome: 'Ana' },
    { id: 3, nome: 'João' }
  ];

  contas = [
    { tipo: 'Aluguel', valor: 1000.00, dataVencimento: '2025-04-05', situacao: 'PENDENTE', idMorador: 1 },
    { tipo: 'Internet', valor: 200.00, dataVencimento: '2025-04-01', situacao: 'QUITADA', idMorador: 2 }
  ];

  filtro = {
    dataInicio: '',
    dataFim: '',
    situacao: '',
    idMorador: ''
  };

  contasFiltradas = [...this.contas];

  consultar() {
    this.contasFiltradas = this.contas.filter(c => {
      const venc = new Date(c.dataVencimento);
      const ini = this.filtro.dataInicio ? new Date(this.filtro.dataInicio) : null;
      const fim = this.filtro.dataFim ? new Date(this.filtro.dataFim) : null;

      const condData =
        (!ini || venc >= ini) &&
        (!fim || venc <= fim);

      const condSit = !this.filtro.situacao || c.situacao === this.filtro.situacao;
      const condMorador = !this.filtro.idMorador || c.idMorador === Number(this.filtro.idMorador);

      return condData && condSit && condMorador;
    });
  }
}
