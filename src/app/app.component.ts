import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title         = 'app';
  activeMovie   = true;
  activeClient  = false;
  activeGenre   = false;
  activeRentals = false;
}
