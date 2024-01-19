import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanellistadosAdminComponent } from './panellistados-admin.component';

describe('PanellistadosAdminComponent', () => {
  let component: PanellistadosAdminComponent;
  let fixture: ComponentFixture<PanellistadosAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanellistadosAdminComponent]
    });
    fixture = TestBed.createComponent(PanellistadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
