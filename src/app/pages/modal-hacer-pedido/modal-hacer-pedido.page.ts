import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';


@Component({
  selector: 'app-modal-hacer-pedido',
  templateUrl: './modal-hacer-pedido.page.html',
  styleUrls: ['./modal-hacer-pedido.page.scss'],
})
export class ModalHacerPedidoPage implements OnInit {

  @Input() c : any;
  @Input() productosS : any;
  productos: any[] = [];
  cantidades: any[] = [];
  contador: any = 0;
  ps: any;
  idArticulo: any;
  seleccionado: any;
  pedido: any[] = [];
  
  constructor(private restService: RestService, private loadingCtrl: LoadingController,private emailComposer: EmailComposer, private pdfGenerator: PDFGenerator) { }

  ngOnInit() {
    this.showLoading();
    console.log(this.c);

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
  for(let i = 0; i<this.productosS.length;i++)
  {
    console.log("Entrando")
    this.cantidades.push([this.productosS[i].article_id,0,false]);
    console.log("Saliendo")
  }
  console.log(this.cantidades);
 }

 selectProductos(articulo, idArticulo,productoSeleccion,indice) {

  if (articulo.target.checked === true) {
    console.log(productoSeleccion);
    this.seleccionado=articulo.detail.checked;
    console.log(this.seleccionado);
    console.log(indice);
    this.idArticulo=idArticulo;
    console.log(this.idArticulo);
    this.cantidades[indice][2]=this.seleccionado;// aquí está la clave de todo el asunto
    console.log('Artículo seleccionado: '+articulo.detail.value);
    console.log('Id del artículo deseleccionado: '+idArticulo);
    console.log('Select: '+this.cantidades[indice][2]);// para imprimir el select de la condición
    for (let i = 0; i < this.cantidades?.length; i++){
      if(this.cantidades[i][2]==true){
        this.seleccionado=true;
      }
    }      
  }
  else {
    console.log(productoSeleccion);
    this.seleccionado=articulo.detail.checked;
    console.log(this.seleccionado);
    console.log(indice);
    this.cantidades[indice][2]=this.seleccionado;
    this.idArticulo=idArticulo;
    this.seleccionado = articulo.detail.checked;
    console.log('Artículo deseleccionado: '+articulo.detail.value);
    console.log('Id del artículo seleccionado: '+idArticulo);
    console.log('Select: '+this.cantidades[indice][2]);
    for (let i = 0; i < this.cantidades?.length; i++){
      if(this.cantidades[i][2]==true){
        this.seleccionado=true;
      }
    } 
    
  }
}

 sumar(id:any)
 {
    for(let i=0; i<this.cantidades.length; i++)
    {
        if(this.cantidades[i][0]===id)
        {
          this.cantidades[i][1]++;
          console.log(this.cantidades);
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
        this.cantidades[i][1]--;
        console.log(this.cantidades);
      }
    }
  }
 }

 hacerPedido()
  {
    for(let i=0; i<this.cantidades.length; i++)
    {
      for(let j =0; j<2; j++)
      {
        if(this.cantidades[i][2] === true)
        {
          this.pedido.push(this.cantidades[i][j]);
        }
      }
    }

    console.log(this.pedido);

    var num = Math.floor(Math.random() * 100);

    var commaSeperatedString = this.pedido.toString();

    console.log(commaSeperatedString);
   this.restService.añadirPedido(num,'2022-01-22',this.restService.company_id,1,commaSeperatedString);
  }

  enviarCorreo()
  {
    let email = {
      to: 'pablo00dm00@gmail.com',
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
    }
    // Send a text message using default options
    //this.emailComposer.open(email);
    
  }

  createPdf() 
  {

  }

}
