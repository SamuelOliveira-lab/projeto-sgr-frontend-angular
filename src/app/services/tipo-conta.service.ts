import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoConta {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipoContaService {
  private readonly baseUrl = 'http://localhost:8080/tipos';

  constructor(private http: HttpClient) {}

  listar(): Observable<TipoConta[]> {
    return this.http.get<TipoConta[]>(this.baseUrl);
  }
}