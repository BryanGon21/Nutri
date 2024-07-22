import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  public brand_data = [
  ];

  /**
   *
   */
  constructor( private router: Router ) {

  }
  evento(){
    console.log('hola');
    this.router.navigate(['/authentication/signin'])

  }
}
