import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rateio } from './rateio.service';

export interface Conta {
  id?: number;
  valor: number;
  dataVencimento: string;
  situacao?: string;
  observacao: string;
  idMorador: number;
  idTipoConta: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private baseUrl = 'http://localhost:8080/contas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.baseUrl);
  }

  cadastrar(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.baseUrl, conta);
  }

  extrato(inicio: string, fim: string): Observable<Conta[]> {
    return this.http.get<Conta[]>(`http://localhost:8080/contas/extrato?dataInicial=${inicio}&dataFinal=${fim}`);
  }

  duplicarConta(id: number): Observable<Conta> {
    return this.http.post<Conta>(`${this.baseUrl}/${id}/replicar`, {});
  }

  atualizarConta(id: number, conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${this.baseUrl}/${id}`, conta);
  }
  
  quitarRateio(idRateio: number, idMorador: number): Observable<Rateio> {
    return this.http.put<Rateio>(`http://localhost:8080/rateios/${idRateio}/quitar?moradorId=${idMorador}`, {});
  }
  
  
}
