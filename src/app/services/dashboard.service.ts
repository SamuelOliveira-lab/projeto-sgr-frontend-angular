import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from './conta.service'; // reutilizando sua interface existente

export interface GastoPorTipoDTO {
  tipo: string;
  total: number;
}

export interface GastoPorMoradorDTO {
  moradorNome: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'https://projeto-sgr-backend-springboot-2.onrender.com/contas';


  constructor(private http: HttpClient) {}

  getContasPendentes(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.baseUrl}/pendentes`);
  }

  getGastosPorTipo(): Observable<GastoPorTipoDTO[]> {
    return this.http.get<GastoPorTipoDTO[]>(`${this.baseUrl}/dashboard/gastos-por-tipo`);
  }

  getGastosPorMorador(): Observable<GastoPorMoradorDTO[]> {
    return this.http.get<GastoPorMoradorDTO[]>(`${this.baseUrl}/dashboard/gastos-por-morador`);
  }
}
