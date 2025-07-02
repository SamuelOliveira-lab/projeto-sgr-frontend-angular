import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-morador-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './morador-cadastro.component.html',
  styleUrl: './morador-cadastro.component.css'
})
export class MoradorCadastroComponent {
  moradorForm: FormGroup;

    constructor(private fb: FormBuilder) { //pq tenho que passar formBuilder
        this.moradorForm = this.fb.group({
          nome: ['', Validators.required],
          cpf: ['', Validators.required],
          celular: ['', Validators.required],
          datanascimento: ['', Validators.required],
          email: ['', Validators.required, Validators.email],
          contatoFamilia: ['']
        })
    }

    onSubmit(){
      if (this.moradorForm.valid){
        const morador = this.moradorForm.value;
        console.log('Morador cadastrado', morador)
        //Chamar o serviço de autentificaçao do backend
      }
    }

}
