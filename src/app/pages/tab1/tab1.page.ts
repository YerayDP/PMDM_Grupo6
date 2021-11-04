<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
=======
import { Component, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
>>>>>>> Stashed changes
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
<<<<<<< Updated upstream
export class Tab1Page implements OnInit{
=======
export class Tab1Page {
  @ViewChild('lista', {static: true}) lista: IonList;
>>>>>>> Stashed changes
  usuarios: any=[];

  constructor(private restService: RestService) { 
    
   }

  
  ngOnInit() {
    this.restService.obtenerUsuarios(this.restService.token)
    
    .then(data => {
        this.usuarios = data;
        
    });
  }
<<<<<<< Updated upstream
  
=======

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

>>>>>>> Stashed changes
}
    
  


