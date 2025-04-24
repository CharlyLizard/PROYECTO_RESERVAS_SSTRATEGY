import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracionesComponent } from './integraciones.component';

describe('IntegracionesComponent', () => {
  let component: IntegracionesComponent;
  let fixture: ComponentFixture<IntegracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegracionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
