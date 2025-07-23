import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post('https://projeto-sgr-backend-springboot-2.onrender.com/moradores/auth/login',
        loginData,
        { responseType: 'text' }
      ).subscribe({
        next: res => {
          // Salva o token (ou qualquer dado retornado) no localStorage
          localStorage.setItem('authToken', res);
          this.router.navigate(['/conta']); // Redireciona após o login
        },
        error: err => {
          alert('Erro no login: ' + err.error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
