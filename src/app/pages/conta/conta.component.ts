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
  rateioForms: { [idConta: number]: FormGroup } = {};
  editandoContaId: number | null = null;


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

  quitarRateio(idRateio: number, idMorador: number): void {
    if (!confirm('Deseja realmente quitar este rateio?')) return;
  
    this.contaService.quitarRateio(idRateio, idMorador).subscribe({
      next: atualizado => {
        // Atualiza a situação do rateio localmente
        const contaId = atualizado.idConta;
        const rateios = this.rateiosPorConta[contaId];
        const index = rateios.findIndex(r => r.id === atualizado.id);
        if (index !== -1) {
          rateios[index] = atualizado;
        }
        alert('Rateio quitado com sucesso!');
        this.buscarContas;
      },
      error: err => {
        console.error(err);
        alert(err.error?.message || 'Erro ao quitar rateio');
      }
    });
    
  }
  

  duplicarConta(id: number): void {
    this.contaService.duplicarConta(id).subscribe({
      next: novaConta => {
        this.contas.push(novaConta);
        this.rateiosPorConta[novaConta.id!] = [];
  
        this.rateioForms[novaConta.id!] = this.fb.group({
          idMorador: [null],
          valor: [0]
        });
        
        // Preenche o formulário com os dados da nova conta
        this.contaForm.patchValue({
          idMorador: novaConta.idMorador,
          situacao: novaConta.situacao,
          dataVencimento: novaConta.dataVencimento,
          valor: novaConta.valor,
          idTipoConta: novaConta.idTipoConta,
          observacao: novaConta.observacao
        });
  
        // Salva o ID da conta que está sendo editada (ver passo 2)
        this.editandoContaId = novaConta.id!;
      },
      error: err => {
        console.error('Erro ao duplicar conta:', err);
        alert('Erro ao duplicar conta');
      }
    });
  }

  removerRateio(rateio: Rateio): void {
    const confirmado = confirm('Tem certeza que deseja remover este rateio?');
    if (!confirmado) return;
  
    this.rateioService.remover(rateio.id!).subscribe({
      next: () => {
        alert('Rateio removido com sucesso!');
        this.carregarRateios(rateio.idConta); // recarrega da API
      },
      error: err => {
        console.error(err);
        alert('Erro ao remover rateio.');
      }
    });
  }
  

  carregarRateios(contaId: number): void {
    this.rateioService.listarPorConta(contaId).subscribe(rateios => {
      this.rateiosPorConta[contaId] = rateios;
      this.inicializarRateioForm(contaId);

      
    });
  }

  
  inicializarRateioForm(contaId: number): void {
    this.rateioForms[contaId] = this.fb.group({
      idMorador: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  cadastrarRateio(contaId: number): void {
    const form = this.rateioForms[contaId];
    if (form.valid) {
      const novoRateio: Rateio = {
        idMorador: form.value.idMorador,
        valor: form.value.valor,
        idConta: contaId,
        situacao: 'EM_ABERTO'
      };

      this.rateioService.cadastrar(novoRateio).subscribe({
        next: () => {
          alert('Rateio cadastrado com sucesso!');
          this.carregarRateios(contaId);
          form.reset();
        },
        error: err => {
          console.error(err);
          alert('Erro ao cadastrar rateio.');
        }
      });
    } else {
      form.markAllAsTouched();
    }
  }


  carregarMoradores(): void {
    this.moradorService.listar().subscribe(data => {
      this.moradores = data;
    });
  }
  buscarContas(): void {
    this.contaService.listar().subscribe(contas => {
      this.contas = contas;

      this.contas.forEach(conta => {
        this.carregarRateios(conta.id!);
        this.inicializarRateioForm(conta.id!);
      });
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
    if (this.contaForm.invalid) return;
  
    const conta = this.contaForm.value;
  
    if (this.editandoContaId) {
      // Atualizar conta existente (você pode implementar PUT no service/backend)
      this.contaService.atualizarConta(this.editandoContaId, conta).subscribe({
        next: atualizada => {
          const index = this.contas.findIndex(c => c.id === this.editandoContaId);
          if (index !== -1) {
            this.contas[index] = atualizada;
          }
          this.editandoContaId = null;
          this.contaForm.reset();
        },
        error: err => {
          console.error('Erro ao atualizar conta:', err);
        }
      });
    } else {
      // Criar nova conta
      this.contaService.cadastrar(conta).subscribe(nova => {
        this.contas.push(nova);
        this.contaForm.reset();
      });
    }
  }
}