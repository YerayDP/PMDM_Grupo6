import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { LoadingController } from '@ionic/angular';
=======
import { ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
>>>>>>> 8c4c89236997b48c7ed266273381f711fac2329d
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading: any;
  usuarios: any=[];

  
  constructor(private restService: RestService, private loadingCtrl: LoadingController) { 
    
    
   }

   ngOnInit(){
    this.showLoading();
    
   
  }
  verUsuarios() {
    this.restService.obtenerUsuarios(this.restService.token)
    
    .then(data => {
        this.usuarios = data;
        
    });
   

  }

  async showLoading() {  
    const loading = await this.loadingCtrl.create({  
    message: 'Loading.....'   
    });  
    loading.present();  
    setTimeout(() => {  
      loading.dismiss();  
      this.verUsuarios()
    }, 500 );  
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
    
  


