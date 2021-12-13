import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalDatosArtPage } from '../modal-datos-art/modal-datos-art.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pedidos: any = [];
  id:any;
  articulo:any;
  company:any;

  constructor(private restService: RestService, private loadingCtrl: LoadingController,private modalCtrl: ModalController) { }

  ngOnInit() {
    this.showLoading();
  }

  verPedidos()
  {
      this.restService.obtenerPedidos()
      .then(data => {
        this.pedidos = data;
    });  
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({  
    message: 'Loading.....'
    });  
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.company=this.restService.company_id;
      this.verPedidos();
    }, 500 );
 }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.pedidos.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
