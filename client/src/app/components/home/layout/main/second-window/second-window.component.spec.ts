import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondWindowComponent } from './second-window.component';

describe('SecondWindowComponent', () => {
  let component: SecondWindowComponent;
  let fixture: ComponentFixture<SecondWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
