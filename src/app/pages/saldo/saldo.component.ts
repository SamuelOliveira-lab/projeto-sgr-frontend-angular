import { Component, OnInit } from '@angular/core';
import { MoradorService } from '../../services/morador.service';
import { RateioService } from '../../services/rateio.service';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-saldo',
  standalone: true,
  templateUrl: './saldo.component.html',
  styleUrl: './saldo.component.css',
  imports: [CommonModule]
})
export class SaldoComponent implements OnInit {

  saldos: { morador: string; valor: number }[] = [];

  constructor(
    private moradorService: MoradorService,
    private rateioService: RateioService
  ) { }

  ngOnInit(): void {
    this.moradorService.listar().subscribe(moradores => {
      moradores.forEach(m => {
        this.rateioService.getSaldoDoMorador(m.id!).subscribe(saldo => {
          this.saldos.push({ morador: m.nome, valor: +saldo });

        });
      });
    });
  }
}