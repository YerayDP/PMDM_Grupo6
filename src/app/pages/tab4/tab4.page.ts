import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalArticulosPage } from '../modal-articulos/modal-articulos.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild('lista', {static: true}) lista: IonList;
  loading: any;
  usuarios: any=[];
  usuario: any;
  currentUser: any;
  titulo: any;
  productos: any = [];
  tipo: any;

  constructor(private restService: RestService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.showLoading();
    this.tipo=this.restService.userLogged;
  }

  verProductos()
  {
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
      this.verProductos();
    }, 500 );
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
    const p=this.productos['data']
   const modal = await this.modalCtrl.create({
     component: ModalArticulosPage,
     componentProps: {
      p
     }
   });

   await modal.present();

   const { data } = await modal.onDidDismiss();

   this.showLoading();

   console.log(p);
  }

}
