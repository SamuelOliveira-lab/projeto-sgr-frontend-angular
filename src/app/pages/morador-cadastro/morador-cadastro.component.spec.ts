import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradorCadastroComponent } from './morador-cadastro.component';

describe('MoradorCadastroComponent', () => {
  let component: MoradorCadastroComponent;
  let fixture: ComponentFixture<MoradorCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoradorCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoradorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
