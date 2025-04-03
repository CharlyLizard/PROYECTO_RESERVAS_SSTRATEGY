import { Component } from '@angular/core';
import { HeaderComponent } from './layout/Header/header.component';
import { FooterComponent } from './layout/Footer/footer.component';
import { FirstWindowComponent } from './layout/main/FirstWindow/first-window.component';
import { StepperComponent } from './layout/main/stepper/stepper.component';

@Component({
  selector: 'app-home',
  imports: [StepperComponent, FooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
