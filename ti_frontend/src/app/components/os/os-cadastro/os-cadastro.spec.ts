import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OSCadastro } from './os-cadastro';

describe('OSCadastro', () => {
  let component: OSCadastro;
  let fixture: ComponentFixture<OSCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OSCadastro],
    }).compileComponents();

    fixture = TestBed.createComponent(OSCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
