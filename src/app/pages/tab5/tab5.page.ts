import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pedidos: any = [];
  pedidosFin: any = [];
  id:any;
  articulo:any;
  company:any;

  constructor(private restService: RestService, private loadingCtrl: LoadingController,private modalCtrl: ModalController) { }

  ngOnInit() {
    this.showLoading();
    this.company=this.restService.currentUser.data.company;
    console.log(this.restService.currentUser);
    console.log(this.company);
    console.log(this.pedidos);
  }

  verPedidos()
  {
      this.restService.obtenerPedidos()
      .then(data => {
        this.pedidos = data;
        console.log(this.pedidos.data.length);
        console.log(this.pedidos.data[1].target_company_name);
        //this.pedidosFin.push(this.pedidos.data[1].target_company_name)

        for(let i = 0; i<this.pedidos.data.length;i++)
        {
          console.log(this.pedidos.data[i].target_company_name);
          var c = this.pedidos.data[i].target_company_name;
          console.log(c)
          console.log(this.company)
          if(c===this.restService.currentUser.data.company)
          {
          //console.log(c);
          this.pedidosFin.push(this.pedidos.data[i]);
          }
        }
        console.log(this.pedidosFin);

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
    if (this.pedidosFin.length > 2) {
      event.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }

    event.target.complete();
   }, 1000);
 }

}
