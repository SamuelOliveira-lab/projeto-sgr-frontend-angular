import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Morador {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  celular: string;
  email: string;
  contatoFamilia: string;
  login: string;
  senha: string;
  foto: string;
}

@Injectable({ providedIn: 'root' })
export class MoradorService {
  private apiUrl = 'http://localhost:8080/moradores';

  constructor(private http: HttpClient) {}

  cadastrar(morador: Morador): Observable<Morador> {
    return this.http.post<Morador>(this.apiUrl, morador);
  }

  listar(): Observable<Morador[]> {
    return this.http.get<Morador[]>(this.apiUrl);
  }
}
