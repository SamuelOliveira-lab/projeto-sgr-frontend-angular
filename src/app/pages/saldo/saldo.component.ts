import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo.component.html',
  styleUrl: './saldo.component.css'
})
export class SaldoComponent {

  saldos: { morador: string; valor: number }[] = [];

  ngOnInit(): void {
    
    this.saldos = [
      { morador: 'João', valor: 120.50 },
      { morador: 'Maria', valor: 75.00 },
      { morador: 'Pedro', valor: 0.00 }
    ];
  }

}
