import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  pedidos: any = [];

  constructor(private restService: RestService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.showLoading();
  }

  verPedidos()
  {
    if (this.restService.userLogged=="a") {
      console.log('');
    }else{

      this.restService.obtenerPedidos(this.restService.token)
      .then(data => {
        this.pedidos = data;
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
      this.verPedidos();
    }, 500 );
 }

}
