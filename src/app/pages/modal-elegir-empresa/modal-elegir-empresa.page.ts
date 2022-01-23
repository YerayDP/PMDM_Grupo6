import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalHacerPedidoPage } from '../modal-hacer-pedido/modal-hacer-pedido.page';

@Component({
  selector: 'app-modal-elegir-empresa',
  templateUrl: './modal-elegir-empresa.page.html',
  styleUrls: ['./modal-elegir-empresa.page.scss'],
})
export class ModalElegirEmpresaPage implements OnInit {

  empresas: any = [];
  empresasF: any = [];
  Misproductos: any = [];
  Susproductos: any = [];
  productos: any = [];
  company_id: any;
  MisIds:any[]=[];
  SusIds:any[]=[];

  constructor(private modalCtrl: ModalController, private restService: RestService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.empresas=this.restService.listCompanies['data'];
    for(let i = 0; i<this.empresas.length;i++)
    {
      console.log(this.empresas[i].id);
      if(this.empresas[i].id!=this.restService.company_id)
      this.empresasF.push(this.empresas[i]);
    }

    this.obtenerProductos();
    this.showLoading();
    console.log(this.empresas);
    console.log(this.empresasF);
  }

  async obtenerProductos()
  {
    this.restService.obtenerProductos(this.restService.company_id)
      .then(data => {
        this.Misproductos = data['data'];

    for(let i = 0; i<this.Misproductos.length;i++)
        {
          this.MisIds.push(this.Misproductos[i].article_id);
        }
      
        console.log(this.MisIds);
        console.log(this.Misproductos);
        
    });


    this.restService.obtenerProductos(1)
      .then(data => {
        this.Susproductos = data['data'];
        
        for(let i = 0; i<this.Susproductos.length;i++)
        {
          this.SusIds.push(this.Susproductos[i].article_id);
        }
        
        console.log(this.SusIds);
        console.log(this.Susproductos);
        
    });
  }

  f()
  {

    var listasId:any[]=[];
    listasId = this.MisIds.filter(e => this.SusIds.includes(e));
    console.log(listasId);

    for(let z=0; z<this.Susproductos.length;z++)
    {
      for(let d=0; d<listasId.length;d++)
      {
        if(this.Susproductos[z].article_id==listasId[d])
        {
          this.productos.push(this.Susproductos[z]);
        }
      }
    }

    console.log(this.Misproductos);
    console.log(this.Susproductos);
    console.log(this.MisIds);
    console.log(this.SusIds);
    console.log(this.productos);

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

  async abrirmodalPedido()
  {
    var c = this.company_id;
    var productosS = this.productos;
    this.modalCtrl.dismiss();
   const modal = await this.modalCtrl.create({
     component: ModalHacerPedidoPage,
     componentProps: {
       c,
       productosS
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
    setTimeout(() => {
      this.f();
      loading.dismiss();
    }, 1000 );
   }

}
