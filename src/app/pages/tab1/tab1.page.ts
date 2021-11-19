import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { LoadingController } from '@ionic/angular';  
import { ThisReceiver } from '@angular/compiler';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalArticulosPage } from '../modal-articulos/modal-articulos.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('lista', {static: true}) lista: IonList;
  loading: any;
  usuarios: any=[];
  usuario: any;
  currentUser: any;
  titulo: any;
  productos: any = [];
  tipo: any;
  
  constructor(private restService: RestService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private alertController: AlertController) { 
    
    
   }

  ngOnInit(){
    this.showLoading();
    this.tipo=this.restService.userLogged;
   
  }
  verUsuarios() {

    if (this.restService.userLogged=="a") {
   
      this.restService.obtenerUsuarios(this.restService.token)
  
      .then(data => {
          this.usuarios = data;
          
      });

    }else{

      this.restService.obtenerProductos(this.restService.company_id)
      .then(data => {
        this.productos = data;
        
    });  

    }

  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({  
    message: 'Loading.....'
    });  
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.verUsuarios();
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

   async eliminar(id:any) {

    this.alertController.create({
      header: 'Cuidado',
      message: '¿Seguro que desea borrar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Operacion cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log(id);
            this.restService.eliminar(this.restService.token,id)
            this.lista.closeSlidingItems();
            this.showLoading();
          }
        }
      ]
    }).then(res => {
      res.present();
    });

   }

   async abrirmodal(user:any)
   {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        user
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    this.showLoading();
   }

   async eliminarP(id:any) {

    this.alertController.create({
      header: 'Cuidado',
      message: '¿Seguro que desea borrar este articulo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Operacion cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log(id);
            this.restService.eliminarProducto(this.restService.token,id)
            this.lista.closeSlidingItems();
            this.showLoading();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  async abrirmodalArticulos()
  {
   const modal = await this.modalCtrl.create({
     component: ModalArticulosPage,
     componentProps: {
     }
   });

   await modal.present();

   const { data } = await modal.onDidDismiss();
   console.log(data);

   this.showLoading();
  }
}
