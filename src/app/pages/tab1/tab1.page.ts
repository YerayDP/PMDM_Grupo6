import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  usuarios: any=[];

  constructor(private restService: RestService) { 
    
   }

  
  ngOnInit() {
    this.restService.obtenerUsuarios(this.restService.token)
    
    .then(data => {
        this.usuarios = data;
        
    });
  }
  
  verUsuarios() {
    this.restService.obtenerUsuarios(this.restService.token)

    .then(data => {
        this.usuarios = data;

    });
  }

  activar() {
    console.log(this.restService.token);
    this.restService.activar(this.restService.token)
    //this.lista.closeSlidingItems();
   }

   desactivar() {
    console.log(this.restService.token);
    this.restService.desactivar(this.restService.token)
    //this.lista.closeSlidingItems();
   }

}
    
  


