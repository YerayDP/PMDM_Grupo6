import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-modal-precio',
  templateUrl: './modal-precio.page.html',
  styleUrls: ['./modal-precio.page.scss'],
})
export class ModalPrecioPage implements OnInit {
  
  @Input() producto : any;

  precio_min : any;
  precio_max : any;
  familia : any;
  precio : any;
  precioFin : any;
  Fprofit : any;

  constructor(private modalCtrl: ModalController, private restService: RestService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    
    this.showLoading();
    this.precio_min = this.producto.price_min;
    this.precio_max = this.producto.price_max;
  }

  obtenerprofit()
  {
    for(let i = 0; i < this.restService.familias.data.length;i++)
    {
      if(this.producto.family_id=this.restService.familias.data[i].id)
      {
      var f = this.restService.familias.data[i];
      this.familia=f;
      this.Fprofit=this.familia;
      }
    }
    this.precioFin=this.precio*11;
    console.log(this.precioFin);
  }

  salirSinArgumentos()
  {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos()
  {
    this.restService.añadirProducto(this.producto.id, this.restService.company_id, this.precio, this.producto.family_id)
    console.log(this.producto.id);
    console.log(this.precio);
    console.log(this.producto.family_id);
    console.log(this.restService.company_id);
    this.router.navigate(['/tabs-u/tab4'])
    this.modalCtrl.dismiss({
      
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({  
    message: 'Loading.....'
    });  
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.obtenerprofit();
    }, 500 );
 }
  
}
