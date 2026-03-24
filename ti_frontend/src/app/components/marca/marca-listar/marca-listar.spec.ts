import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaListar } from './marca-listar';

describe('MarcaListar', () => {
  let component: MarcaListar;
  let fixture: ComponentFixture<MarcaListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaListar]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcaListar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
