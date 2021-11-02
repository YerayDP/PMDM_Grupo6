import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  usuarios: any;

  constructor(private restService: RestService) {
    // Llamamos al login que tiene la Promesa (objeto Promise())
    // data: se llama la api que ha puesto Raúl para este
    this.restService.login().then(data => {// devuelve a lo que ha llamado esta función
      console.log(data);// para mostrar en consola los datos recibidos
    });
  }

  verUsuarios() {
    this.restService.obtenerUsuarios(this.restService.token)
    .then(data => {
        this.usuarios = data;
        console.log(this.usuarios);
    });
  }

}
