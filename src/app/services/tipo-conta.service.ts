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
  private readonly baseUrl = 'https://projeto-sgr-backend-springboot-2.onrender.com/tipos';
;

  constructor(private http: HttpClient) {}

  listar(): Observable<TipoConta[]> {
    return this.http.get<TipoConta[]>(this.baseUrl);
  }
}