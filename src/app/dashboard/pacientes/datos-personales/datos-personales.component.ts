import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.scss'
})

export class DatosPersonalesComponent {

  @Input()form: FormGroup;
  @Output() imagen:EventEmitter<any> = new EventEmitter<any>();


constructor(private fb: FormBuilder) {

}


agregarFoto(data:any){
  this.imagen.emit(data)
}
}
