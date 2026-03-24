import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaCadastro } from './marca-cadastro';

describe('MarcaCadastro', () => {
  let component: MarcaCadastro;
  let fixture: ComponentFixture<MarcaCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaCadastro]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcaCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
