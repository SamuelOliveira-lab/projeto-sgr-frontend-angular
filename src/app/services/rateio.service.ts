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
  private baseUrl = 'https://projeto-sgr-backend-springboot-2.onrender.com/rateios';


  constructor(private http: HttpClient) {}

  listarPorConta(idConta: number): Observable<Rateio[]> {
    return this.http.get<Rateio[]>(`${this.baseUrl}/conta/${idConta}`);
  }

  getSaldoDoMorador(idMorador: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/morador/${idMorador}/saldo`);
  }

  cadastrar(rateio: Rateio): Observable<Rateio> {
    return this.http.post<Rateio>(this.baseUrl, rateio);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }  

  quitarRateio(idRateio: number, idMoradorPagador: number): Observable<Rateio> {
    return this.http.put<Rateio>(`http://localhost:8080/rateios/${idRateio}/quitar?moradorId=${idMoradorPagador}`, {});
  }
  
}
