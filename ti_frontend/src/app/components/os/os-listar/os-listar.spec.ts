import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OSListar } from './os-listar';

describe('OSListar', () => {
  let component: OSListar;
  let fixture: ComponentFixture<OSListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OSListar],
    }).compileComponents();

    fixture = TestBed.createComponent(OSListar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
