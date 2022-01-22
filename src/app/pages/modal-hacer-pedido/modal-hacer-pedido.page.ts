import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-modal-hacer-pedido',
  templateUrl: './modal-hacer-pedido.page.html',
  styleUrls: ['./modal-hacer-pedido.page.scss'],
})
export class ModalHacerPedidoPage implements OnInit {

  @Input() c : any;
  @Input() productosS : any;
  productos: any[] = [];
  cantidades: any[][] = [];
  contador: any = 0;
  ps: any;
  myDate: String = new Date().toISOString();
  
  constructor(private restService: RestService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.showLoading();
    //console.log(this.c);
    //console.log(this.productosS);

    for(let i = 0; i<this.productos.length;i++)
    {
      console.log(this.productos[i]+','+this.cantidades[i]);
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
    message: 'Loading.....'
    });  
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.llenar();
    }, 500 );
 }

 llenar()
 {
  interface P {
    id : any;
    cantidad: any;
   }
  
  for(let i = 0; i<this.productosS.length;i++)
  {
    console.log("Entrando")
    this.cantidades.push([this.productosS[i].article_id,0]);
    console.log("Saliendo")
  }
  console.log(this.cantidades);
 }

 sumar(id:any)
 {
  if(this.contador!=20)
  {
    for(let i=0; i<this.cantidades.length; i++) 
    {

      if(this.cantidades[i][0]===id)
      {
        this.cantidades[i][1]+=1;
        console.log(this.cantidades);
      }
    }
  }
 }

 restar(id:any)
 {

  if(this.contador!=0)
  {
    for(let i=0; i<this.cantidades.length; i++) 
    {
      if(this.cantidades[i][0]===id)
      {
        this.cantidades[i][1]+=1;
        console.log(this.cantidades);
      }
    }
  }
 }

 hacerPedido()
 {
   this.restService.añadirPedido('001','2021-12-22',this.restService.company_id,2,'1,1');
  }

}
