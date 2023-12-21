import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuprivadoComponent } from './menuprivado.component';

describe('MenuprivadoComponent', () => {
  let component: MenuprivadoComponent;
  let fixture: ComponentFixture<MenuprivadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuprivadoComponent]
    });
    fixture = TestBed.createComponent(MenuprivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
