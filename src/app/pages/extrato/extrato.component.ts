import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContaService, Conta } from '../../services/conta.service';
import { MoradorService, Morador } from '../../services/morador.service';
import { TipoConta, TipoContaService } from '../../services/tipo-conta.service';

@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.css'
})
export class ExtratoComponent implements OnInit {
  extratoForm!: FormGroup;
  extrato: Conta[] = [];
  moradores: Morador[] = [];
  tipos: TipoConta[] = [];

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private moradorService: MoradorService,
    private tipoContaService: TipoContaService
  ) {}

  ngOnInit(): void {
    this.carregarTipos();
    this.extratoForm = this.fb.group({
      inicio: ['', Validators.required],
      fim: ['', Validators.required],
      situacao: [''],
      idMorador: ['']
    });
    

    this.moradorService.listar().subscribe(data => {
      this.moradores = data;
    });
  }


  consultarExtrato(): void {
    const { inicio, fim, situacao, idMorador } = this.extratoForm.value;
  
    const dataInicio = this.formatarData(inicio);
    const dataFim = this.formatarData(fim);
  
    this.contaService.extrato(dataInicio, dataFim).subscribe(data => {
      this.extrato = data.filter(c =>
        (!situacao || c.situacao === situacao) &&
        (!idMorador || c.idMorador === +idMorador)
      );
    });
  }

  formatarData(data: any): string {
    const d = new Date(data);
    return d.toISOString().slice(0, 10); 
  }

  carregarTipos(): void {
    this.tipoContaService.listar().subscribe(data => {
      this.tipos = data;
    });
  }

  getMoradorNome(id: number): string {
    const morador = this.moradores.find(m => m.id === id);
    return morador ? morador.nome : 'Desconhecido';
  }

  getTipoNome(idTipo: number): string {
    const tipo = this.tipos.find(t => t.id === idTipo);
    return tipo ? tipo.nome : 'Desconhecido';
  }
  
}
