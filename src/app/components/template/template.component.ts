import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'mujer',
    acepta: false
  };

  paises = [{
    codigo: 'CRI',
    nombre: 'Costa Rica'
  },
  {
    codigo: 'ESP',
    nombre: 'España'
  }
];

sexos = ['hombre', 'mujer'];
  constructor() { }

  ngOnInit() {
  }

  guardar( forma: NgForm ) {
    console.log(forma);
    console.log('Forma: ', forma);
    console.log('Valor: ', forma.value);
    console.log('Usuario: ', this.usuario);
  }
}
