import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoLegalComponent } from './contenido-legal.component';

describe('ContenidoLegalComponent', () => {
  let component: ContenidoLegalComponent;
  let fixture: ComponentFixture<ContenidoLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoLegalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
