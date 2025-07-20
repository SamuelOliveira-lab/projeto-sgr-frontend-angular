import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, GastoPorMoradorDTO, GastoPorTipoDTO } from '../../services/dashboard.service';
import { Conta } from '../../services/conta.service';
import { NgChartsModule } from 'ng2-charts';




@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent implements OnInit {
  contas: Conta[] = [];
  gastosPorTipo: GastoPorTipoDTO[] = [];
  gastosPorMorador: GastoPorMoradorDTO[] = [];

  labelsTipo: string[] = [];
  dataTipo: number[] = [];

  labelsMorador: string[] = [];
  dataMorador: number[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getContasPendentes().subscribe(dados => this.contas = dados);

    this.dashboardService.getGastosPorTipo().subscribe(dados => {
      this.gastosPorTipo = dados;
      this.labelsTipo = dados.map(d => d.tipo);
      this.dataTipo = dados.map(d => d.total);
    });

    this.dashboardService.getGastosPorMorador().subscribe(dados => {
      this.gastosPorMorador = dados;
      this.labelsMorador = dados.map(d => d.moradorNome);
      this.dataMorador = dados.map(d => d.total);
    });
  }
}
