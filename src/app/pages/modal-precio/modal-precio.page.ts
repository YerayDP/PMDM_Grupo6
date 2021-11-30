import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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
  
  precio:any;

  constructor(private modalCtrl: ModalController, private restService: RestService, private router: Router) { }

  ngOnInit() {
    this.precio_min = this.producto.price_min;
    this.precio_max = this.producto.price_max;
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
    this.router.navigate(['tab4'])
    this.modalCtrl.dismiss({
      
    });
  }
  tab4Redirect() {
    this.router.navigate(['/tab4']);
  }

}
