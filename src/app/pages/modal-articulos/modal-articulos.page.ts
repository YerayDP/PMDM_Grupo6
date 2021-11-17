import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalPrecioPage } from '../modal-precio/modal-precio.page';

@Component({
  selector: 'app-modal-articulos',
  templateUrl: './modal-articulos.page.html',
  styleUrls: ['./modal-articulos.page.scss'],
})
export class ModalArticulosPage implements OnInit {

  articulos: any = [];

  constructor(private modalCtrl: ModalController, private restService: RestService) { }

  ngOnInit() {
    this.restService.obtenerArticulos(this.restService.token)
    .then(data => {
      this.articulos = data;
      
  });  
  }

  salirSinArgumentos()
  {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos()
  {
    console.log('Hola');
    this.modalCtrl.dismiss({   
    });
  }

  async abrirmodalArticulos(producto:any)
  {
   const modal = await this.modalCtrl.create({
     component: ModalPrecioPage,
     componentProps: {
       producto
     }
   });

   await modal.present();

   const { data } = await modal.onDidDismiss();
   console.log(data);

  }

}
