import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produtolistar } from './produto-listar';

describe('Listar', () => {
  let component: Produtolistar;
  let fixture: ComponentFixture<Produtolistar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produtolistar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Produtolistar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
