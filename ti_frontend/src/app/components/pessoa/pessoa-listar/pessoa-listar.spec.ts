import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaListar } from './pessoa-listar';

describe('PessoaListar', () => {
  let component: PessoaListar;
  let fixture: ComponentFixture<PessoaListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaListar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaListar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
