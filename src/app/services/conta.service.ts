import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
