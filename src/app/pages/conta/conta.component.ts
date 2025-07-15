import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContaService, Conta } from '../../services/conta.service';
import { MoradorService, Morador } from '../../services/morador.service';
import { RateioService, Rateio } from '../../services/rateio.service';
import { TipoContaService, TipoConta } from '../../services/tipo-conta.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent implements OnInit {
  contaForm!: FormGroup;
  contas: Conta[] = [];
  moradores: Morador[] = [];
  tipos: TipoConta[] = [];
  rateiosPorConta: { [idConta: number]: Rateio[] } = {};


  situacoesConta = [
    { label: 'Pendente', value: 'PENDENTE' },
    { label: 'Quitada', value: 'QUITADA' },
    { label: 'Cancelada', value: 'CANCELADA' }
  ];
c: any;


  constructor(private fb: FormBuilder, private contaService: ContaService, private moradorService: MoradorService, private tipoContaService: TipoContaService,
     private rateioService: RateioService
  ) { }

  ngOnInit(): void {
    this.contaForm = this.fb.group({
      valor: [null, [Validators.required, Validators.min(0)]],
      situacao: ['PENDENTE', Validators.required],
      dataVencimento: ['', Validators.required],
      observacao: [''],
      idMorador: [null, Validators.required],
      idTipoConta: [null, Validators.required],
    });


    this.carregarMoradores();
    this.buscarContas();
    this.carregarTipos();
  }

  removerRateio(rateio: Rateio): void {
    const contaId = rateio.idConta;
    if (!this.rateiosPorConta[contaId]) return;
  
    this.rateiosPorConta[contaId] = this.rateiosPorConta[contaId].filter(r => r !== rateio);
  }
  
  carregarRateios(contaId: number): void {
    this.rateioService.listarPorConta(contaId).subscribe(rateios => {
      this.rateiosPorConta[contaId] = rateios;
    });
  }

  carregarMoradores(): void {
    this.moradorService.listar().subscribe(data => {
      this.moradores = data;
    });
  }
  buscarContas(): void {
    this.contaService.listar().subscribe(data => {
      this.contas = data;

      this.contas.forEach(conta => this.carregarRateios(conta.id!));
    });
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


  onSubmit(): void {
    if (this.contaForm.valid) {
      const conta: Conta = this.contaForm.value;
      this.contaService.cadastrar(conta).subscribe({
        next: () => {
          alert('Conta cadastrada com sucesso!');
          this.contaForm.reset();
          this.buscarContas();
        },
        error: err => {
          console.error(err);
          alert('Erro ao cadastrar conta.');
        }
      });
    } else {
      this.contaForm.markAllAsTouched();
    }
  }
}