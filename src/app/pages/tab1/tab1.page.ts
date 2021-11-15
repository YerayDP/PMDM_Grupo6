import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { LoadingController } from '@ionic/angular';  
import { ThisReceiver } from '@angular/compiler';
import { ModalInfoPage } from '../modal-info/modal-info.page';

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
  
  constructor(private restService: RestService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private alertController: AlertController) { 
    
    
   }

  ngOnInit(){
    this.showLoading();
   
  }
  verUsuarios() {

    if (this.restService.userLogged=="a") {

      this.titulo='Administración'
   
      this.restService.obtenerUsuarios(this.restService.token)
  
      .then(data => {
          this.usuarios = data;
          
      });
    }else{
      console.log("Usuario")

      this.titulo = 'Catálogo'
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

   user(id: any)
   {
    this.restService.user(this.restService.token,id)
    .then( data => {
      this.usuario = data;
    });
   }

   cogerId(id:any)
   {
    this.restService.user(this.restService.token,id);
   }

}

function showAlert() {
  throw new Error('Function not implemented.');
}
