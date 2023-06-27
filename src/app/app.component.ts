import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-47840-directivas-practica';
  numero = 0;
  hayError = true;

  myFontSize = '50px';


  constructor() {
    setInterval(() => {
      this.numero++;
    }, 1000);
  }
}
