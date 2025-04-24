import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCitasComponent } from './config-citas.component';

describe('ConfigCitasComponent', () => {
  let component: ConfigCitasComponent;
  let fixture: ComponentFixture<ConfigCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
