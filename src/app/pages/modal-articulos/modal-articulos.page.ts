import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalPrecioPage } from '../modal-precio/modal-precio.page';

@Component({
  selector: 'app-modal-articulos',
  templateUrl: './modal-articulos.page.html',
  styleUrls: ['./modal-articulos.page.scss'],
})
export class ModalArticulosPage implements OnInit {

  @Input() p : any;

  articulos: any = [];
  articulosFin: any = [];

  constructor(private modalCtrl: ModalController, private restService: RestService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    //console.log(this.restService.articulosS.data)
    //this.rellenar();

    this.showLoading();

    console.log(this.p);
  }

  obtenerArticulos()
  {
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
    console.log('Atras');
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({  
    message: 'Loading.....'
    });  
    loading.present();
    this.obtenerArticulos();
    setTimeout(() => {
      loading.dismiss();
    }, 500 );
    

 }

 rellenar()
 {
   //const articulos_id :any[] = [];
   //const productos_id=[];
   //console.log(this.restService.articulosS.data[4].id);
    /*for(let i = 0; i<=this.restService.articulosS.data.length;i++)
    {
      var id : any = this.restService.articulosS.data[i].id;
      articulos_id.push(id);
      console.log(id);
    }
*/
    /*for(let i = 1; i<=this.p.data.length;i++)
    {
      productos_id.push(i);
    }*/

    //console.log(articulos_id);
 }
}
