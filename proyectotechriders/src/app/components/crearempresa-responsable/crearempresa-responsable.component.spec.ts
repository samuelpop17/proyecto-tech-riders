import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearempresaResponsableComponent } from './crearempresa-responsable.component';

describe('CrearempresaResponsableComponent', () => {
  let component: CrearempresaResponsableComponent;
  let fixture: ComponentFixture<CrearempresaResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearempresaResponsableComponent]
    });
    fixture = TestBed.createComponent(CrearempresaResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
