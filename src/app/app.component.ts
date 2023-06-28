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


  status = 2;

  usuario = {
    nombre: 'Maria',
    apellido: ''
  }

  birthday = new Date();

  price = 2500.23;

  constructor() {
    setInterval(() => {
      this.numero++;
    }, 1000);
  }

  onClick(event: MouseEvent): void {
    console.log(event);
    this.hayError = !this.hayError;
  }

  onInputChange(event: KeyboardEvent): void {
    const htmlInput = event.target as HTMLInputElement;
    console.log(htmlInput?.value);
  }

  onSave(): void {
    console.log(this.usuario);
  }
}
