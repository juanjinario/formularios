import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { resetComponentState } from '@angular/core/src/render3/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  formGroup: FormGroup;
  usuario: Object = {
    nombreCompleto: {
      nombre: 'Juan',
      apellido: 'Calderon'
    },
    correo: 'juanjco2@hotmail.com',
    // pasatiempos: ['Correr', 'Bailar', 'Soñar']
  };

  get nombreCompleto() {
    return this.formGroup.controls['nombreCompleto'];
  }

  get nombre() {
    return this.formGroup.get('nombreCompleto.nombre');
  }

  get correo() {
    return this.formGroup.get('correo');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl(null, this.customValidNoHerrera)
      }),
      'correo': new FormControl(null , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl(null, Validators.required)
      ]),
      'username': new FormControl(null, Validators.required, this.asyncValidNoRepeatUser),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null)
    });

    this.confirmPassword.setValidators([Validators.required, this.customValidEqual.bind(this.formGroup)]);
    // this.formGroup.setValue( this.usuario );

    // this.nombreCompleto.valueChanges.subscribe(
    //   data => console.log(data)
    // );

    this.formGroup.statusChanges.subscribe(
      data => console.log(data)
    );
  }

  reset() {
    this.formGroup.reset({
      nombreCompleto: {
        nombre: null,
        apellido: null
      },
      correo: null
    });
  }

  customValidNoHerrera(control: FormControl): { [s: string]: boolean } {
    if ( control.value === 'Herrera') {
      return {
        notequal: true
      };
    }
    return null;
  }

  customValidEqual(control: FormControl): { [s: string]: boolean } {
    // console.log(this);
    const FORMGROUP: any = this;
    if (control.value !== FORMGROUP.controls['password'].value) {
      return {
        notequal: true
      };
    }
    return null;
  }

  asyncValidNoRepeatUser(control: FormControl): Promise<any> | Observable<any> {
    // console.log(this);
    const PROMISE = new Promise(
      ( resolve, reject ) => {
        setTimeout( () => {
          if ( control.value === 'strider' ) {
            resolve( {
              existe: true
            });
          } else {
            resolve( null );
          }
        }, 3000 );
      }
    );
    return PROMISE;
  }

  addElement() {
    (<FormArray>this.formGroup.controls['pasatiempos']).push(
      new FormControl(null, Validators.required)
    );
  }

  save() {
    console.log( this.formGroup.value);
    console.log( this.formGroup);
    // this.reset();
  }
}
