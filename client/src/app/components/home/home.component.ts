import { Component } from '@angular/core';
import { HeaderComponent } from './layout/Header/header.component';
import { FooterComponent } from './layout/Footer/footer.component';
import { FirstWindowComponent } from './layout/main/FirstWindow/first-window.component';

@Component({
  selector: 'app-home',
  imports: [FirstWindowComponent, FooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
