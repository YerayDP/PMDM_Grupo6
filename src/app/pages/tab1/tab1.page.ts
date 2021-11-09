import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { LoadingController } from '@ionic/angular';  
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('lista', {static: true}) lista: IonList;
  loading: any;
  usuarios: any=[];


  
  constructor(private restService: RestService, private loadingCtrl: LoadingController, private route: Router) { 
    
    
   }

  ngOnInit(){
    this.showLoading();
    
   
  }
  verUsuarios() {
  
    if (this.restService.userLogged=="a") {
   
      this.restService.obtenerUsuarios(this.restService.token)
  
      .then(data => {
          this.usuarios = data;
          
      });
    }else{
      console.log("Usuario")
    }

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
  
  activar(id:any) {
    console.log(this.restService.token);
    this.restService.activar(this.restService.token,id)
    this.lista.closeSlidingItems();
    this.showLoading();
   }

   desactivar(id:any) {
    console.log(this.restService.token);
    this.restService.desactivar(this.restService.token,id)
    this.lista.closeSlidingItems();
    this.showLoading();
   }

   eliminar(id:any) {
    console.log(id);
    this.restService.eliminar(this.restService.token,id)
    this.lista.closeSlidingItems();
    this.showLoading();
   }

   editar()
   {
    this.route.navigate(['/edit']);
   }

}