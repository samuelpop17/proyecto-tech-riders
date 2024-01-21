import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlasMistechridersResponsableComponent } from './charlas-mistechriders-responsable.component';

describe('CharlasMistechridersResponsableComponent', () => {
  let component: CharlasMistechridersResponsableComponent;
  let fixture: ComponentFixture<CharlasMistechridersResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharlasMistechridersResponsableComponent]
    });
    fixture = TestBed.createComponent(CharlasMistechridersResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
