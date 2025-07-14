import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoradorService, Morador } from '../../services/morador.service';


@Component({
  selector: 'app-morador-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './morador-cadastro.component.html',
  styleUrl: './morador-cadastro.component.css'
})
export class MoradorCadastroComponent {
  moradorForm: FormGroup;
  moradores: Morador[] = [];

  constructor(private fb: FormBuilder, private moradorService: MoradorService) { //pq tenho que passar formBuilder
    this.moradorForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      celular: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contatoFamilia: [''],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      foto: ['']
    })
  }

  ngOnInit(): void {
    this.buscarMoradores();
  }

  buscarMoradores(): void {
    this.moradorService.listar().subscribe(data => this.moradores = data);
  }

  onSubmit(): void {
    if (this.moradorForm.valid) {
      const morador = this.moradorForm.value as Morador;
      this.moradorService.cadastrar(morador).subscribe({
        next: () => {
          alert('Morador cadastrado com sucesso!');
          this.moradorForm.reset();
          this.buscarMoradores();
        },
        error: err => {
          console.error(err);
          alert('Erro ao cadastrar morador.');
        }
      });
    } else {
      this.moradorForm.markAllAsTouched();
    }
  }
}
