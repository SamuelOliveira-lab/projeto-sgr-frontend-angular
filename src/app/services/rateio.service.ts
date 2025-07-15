import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rateio {
  id?: number;
  valor: number;
  situacao: string;
  idMorador: number;
  idConta: number;
}

@Injectable({
  providedIn: 'root'
})
export class RateioService {
  private baseUrl = 'http://localhost:8080/rateios';

  constructor(private http: HttpClient) {}

  listarPorConta(idConta: number): Observable<Rateio[]> {
    return this.http.get<Rateio[]>(`${this.baseUrl}/conta/${idConta}`);
  }
}
