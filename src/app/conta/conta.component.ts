import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent {
  contaForm!: FormGroup;

  moradores = ['João', 'Maria', 'Pedro'];

    constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contaForm = this.fb.group({
      moradorResponsavel: ['', Validators.required],
      situacaoConta: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0)]],
      tipoConta: ['', Validators.required],
      observacao: ['']
    });
  }

    onSubmit(): void {
    if (this.contaForm.valid) {
      const dados = this.contaForm.value;
      console.log('Dados da conta:', dados);

      // Aqui você pode enviar os dados para uma API
    } else {
      console.warn('Formulário inválido!');
      this.contaForm.markAllAsTouched(); // Força mostrar os erros no template
    }
  }


}
