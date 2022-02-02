import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform, AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

pdfMake.vfs = pdfFonts.pdfMake.vfs;



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
  pdfObj: any;
  DatosCompany: any[] = [];
  listCompany2: any[] = [];
  num:any;
  fecha: any;
  lista: any[] = [];
  docDefinition: any;
  user: any[] = [];
  mail:any = "pablo00dm00@gmail.com";
  usuarios: any=[];
  
  constructor(private modalCtrl: ModalController, private restService: RestService, private loadingCtrl: LoadingController,private alertCtrl: AlertController,
    public file: File,
    public FileOpener: FileOpener,
    public platform: Platform,
    private emailComposer: EmailComposer
    ) { }

  ngOnInit() {
    //this.encontrarEmail();
    this.showLoading2();
    console.log(this.restService.usuarios);
    /*for(let i = 0; i<this.restService.usuarios.length;i++)
    {
      if(this.restService.usuarios['i'].company_id === this.restService.company_id)
      {
        this.usuarios.push(this.restService.usuarios['i']);
        console.log("Si");
      }
      console.log("No");
    }*/
    this.fecha = '2022-02-22';
    this.num = Math.floor(Math.random() * 100);
    //console.log(this.restService.company);
    console.log(this.restService.company_id);
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

  async showLoading2() {
    const loading = await this.loadingCtrl.create({
    message: 'Loading.....'
    });  
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.encontrarEmail();
    }, 500 );
  }

  async encontrarEmail()
  {
    for(let i = 0; i<this.restService.usuarios.length;i++)
    {
      if(this.restService.usuarios['i'].company_id === this.restService.company_id)
      {
        this.usuarios.push(this.restService.usuarios['i']);
        console.log("Si");
      }
      console.log("No");
    }
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
        if(this.cantidades[i][0]===id && this.cantidades[i][1]<=39)
        {
          this.cantidades[i][1]++;
          console.log(this.cantidades);
        }
    }
 }

 restar(id:any)
 {
    for(let i=0; i<this.cantidades.length; i++)
    {
      if(this.cantidades[i][0]===id && this.cantidades[i][1]>=1)
      {
        this.cantidades[i][1]--;
        console.log(this.cantidades);
      }
    }
 }

 hacerPedido()
  {
    for(let i=0; i<this.cantidades.length; i++)
    {
      for(let j =0; j<2; j++)
      {
        if(this.cantidades[i][2] === true && this.cantidades[i][1]>0)
        {
          this.pedido.push(this.cantidades[i][j]);
        }
      }
    }

    
    for(let i=0; i<this.productosS.length; i++)
    {
      console.log(this.productosS);
      console.log(this.cantidades[i][0]);
      if(this.productosS[i].article_id === this.cantidades[i][0] && this.cantidades[i][2] === true && this.lista[i]!=this.productosS[i])
        {
          this.lista.push(this.productosS[i]);
        }
      
    }

    console.log(this.lista);
    console.log(this.pedido);

    var commaSeperatedString = this.pedido.toString();

    console.log(commaSeperatedString);
    this.restService.añadirPedido(this.num,this.fecha,this.restService.company_id,this.c,commaSeperatedString);

    this.createPdf();
    this.openPdf();
    this.enviarMail();
  }



  createPdf() 
  {
    var total=0;
    this.listCompany2 = this.restService.listCompanies.data;
    console.log(this.listCompany2);
    for(let i=0; i<this.listCompany2.length; i++)
    {
      console.log(this.listCompany2);
      console.log(this.restService.company_id);
      if(this.listCompany2[i]['id']===this.restService.company_id)
      {
        this.DatosCompany.push(this.listCompany2[i])
      }
    }
    console.log(this.c);
    console.log(this.DatosCompany);

    if(this.lista.length===1)
    {
      alert('PDF Generado');

        this.docDefinition = {
        content: [
          'Pedido',
      {
        style: 'tableExample',
        table: {
          heights: 10,
          body: [
            [this.DatosCompany[0]['name']+"\n"+"\n"+
            this.DatosCompany[0]['address']+"\n"+"\n"+
            this.DatosCompany[0]['city']+"\n"+"\n"+
            this.DatosCompany[0]['cif']+"\n"+"\n"+
            this.DatosCompany[0]['email'], 'Pedido Nº '+this.num+"\n"+"\n"+"\n"+"\n"+
                                            'Fecha '+this.fecha],
            ['Direccion de envío: C/ Teran n8 2D'+"\n"+"\n"+
            'Fecha de entrega: 20/02/2022'+"\n"+"\n"+
            'Transporte:   A nuestro cargo'+"\n"+"\n"+
            'Forma de pago: En efectivo'+"\n"+"\n"+
            'Condiciones de entrega: ', ''],
            ['ID          Descripcion ',' Cantidad         Precio          Importe'],
            [
              this.lista[0]['article_id']+'            '+this.lista[0]['compamy_description'], this.pedido[1]+'     '+                this.lista[0]['price']+'       '                +this.lista[0]['price']*this.pedido[1]
            ],
            ['Total                                                                   ',+this.lista[0]['price']*this.pedido[1]],
            ['Aceptado por','']
          ]
        }
      },
        ]
      };
    }

    if(this.lista.length===2)
    {
      total = this.lista[0]['price']*this.pedido[1]+this.lista[1]['price']*this.pedido[3]
      alert('PDF Generado');

        this.docDefinition = {
        content: [
          'Pedido',
      {
        style: 'tableExample',
        table: {
          heights: 10,
          body: [
            [this.DatosCompany[0]['name']+"\n"+"\n"+
            this.DatosCompany[0]['address']+"\n"+"\n"+
            this.DatosCompany[0]['city']+"\n"+"\n"+
            this.DatosCompany[0]['cif']+"\n"+"\n"+
            this.DatosCompany[0]['email'], 'Pedido Nº '+this.num+"\n"+"\n"+"\n"+"\n"+
                                            'Fecha '+this.fecha],
            ['Direccion de envío: C/ Teran n8 2D'+"\n"+"\n"+
            'Fecha de entrega: 08/01/2022'+"\n"+"\n"+
            'Transporte:   A nuestro cargo'+"\n"+"\n"+
            'Forma de pago: En efectivo'+"\n"+"\n"+
            'Condiciones de entrega: ', ''],
            ['ID          Descripcion ',' Cantidad         Precio        Importe'],
            [
              this.lista[0]['article_id']+'       '+this.lista[0]['compamy_description'], this.pedido[1]+'       '+this.lista[0]['price']+'       '+this.lista[0]['price']*this.pedido[1]
            ],
            [
              this.lista[1]['article_id']+'       '+this.lista[1]['compamy_description'], this.pedido[3]+'       '+this.lista[1]['price']+'       '+this.lista[1]['price']*this.pedido[3]
            ],
            ['Total                                                                   ',''       +                                           total+' €'],
            ['Aceptado por','']
          ]
        }
      },
        ]
      };
    }

    if(this.lista.length===3)
    {
      total = this.lista[0]['price']*this.pedido[1] + this.lista[1]['price']*this.pedido[3] + this.lista[2]['price']*this.pedido[5]
      alert('PDF Generado');

        this.docDefinition = {
        content: [
          'Pedido',
      {
        style: 'tableExample',
        table: {
          heights: 10,
          body: [
            [this.DatosCompany[0]['name']+"\n"+"\n"+
            this.DatosCompany[0]['address']+"\n"+"\n"+
            this.DatosCompany[0]['city']+"\n"+"\n"+
            this.DatosCompany[0]['cif']+"\n"+"\n"+
            this.DatosCompany[0]['email'], 'Pedido Nº '+this.num+"\n"+"\n"+"\n"+"\n"+
                                            'Fecha '+this.fecha],
            ['Direccion de envío: C/ Teran n8 2D'+"\n"+"\n"+
            'Fecha de entrega: 08/01/2022'+"\n"+"\n"+
            'Transporte:   A nuestro cargo'+"\n"+"\n"+
            'Forma de pago: En efectivo'+"\n"+"\n"+
            'Condiciones de entrega: ', ''],
            ['ID          Descripcion ',' Cantidad         Precio       Importe'],
            [
              this.lista[0]['article_id']+'       '+this.lista[0]['compamy_description'], this.pedido[1]+'       '+this.lista[0]['price']+'       '+this.lista[0]['price']*this.pedido[1]
            ],
            [
              this.lista[1]['article_id']+'       '+this.lista[1]['compamy_description'], this.pedido[3]+'       '+this.lista[1]['price']+'       '+this.lista[1]['price']*this.pedido[3]
            ],
            [
              this.lista[2]['article_id']+'        '+this.lista[2]['compamy_description'], this.pedido[5]+'       '+this.lista[2]['price']+'       '+this.lista[2]['price']*this.pedido[5]
            ],
            ['Total                                                                   ','                                                  40 €'],
            ['Aceptado por','']
          ]
        }
      },
        ]
      };
    }

    if(this.lista.length===4)
    {
      total = this.lista[0]['price']*this.pedido[1] + this.lista[1]['price']*this.pedido[3] + this.lista[2]['price']*this.pedido[5] + this.lista[3]['price']*this.pedido[7]
      alert('PDF Generado');

        this.docDefinition = {
        content: [
          'Pedido',
      {
        style: 'tableExample',
        table: {
          heights: 10,
          body: [
            [this.DatosCompany[0]['name']+"\n"+"\n"+
            this.DatosCompany[0]['address']+"\n"+"\n"+
            this.DatosCompany[0]['city']+"\n"+"\n"+
            this.DatosCompany[0]['cif']+"\n"+"\n"+
            this.DatosCompany[0]['email'], 'Pedido Nº '+this.num+"\n"+"\n"+"\n"+"\n"+
                                            'Fecha '+this.fecha],
            ['Direccion de envío: C/ Teran n8 2D'+"\n"+"\n"+
            'Fecha de entrega: 08/01/2022'+"\n"+"\n"+
            'Transporte:   A nuestro cargo'+"\n"+"\n"+
            'Forma de pago: En efectivo'+"\n"+"\n"+
            'Condiciones de entrega: ', ''],
            ['ID          Descripcion ',' Cantidad         Precio        Importe'],
            [
              this.lista[0]['article_id']+'       '+this.lista[0]['compamy_description'], this.pedido[1]+'       '+this.lista[0]['price']+'       '+this.lista[0]['price']*this.pedido[1]
            ],
            [
              this.lista[1]['article_id']+'       '+this.lista[1]['compamy_description'], this.pedido[3]+'       '+this.lista[1]['price']+'       '+this.lista[1]['price']*this.pedido[3]
            ],
            [
              this.lista[2]['article_id']+'        '+this.lista[2]['compamy_description'], this.pedido[5]+'       '+this.lista[2]['price']+'       '+this.lista[2]['price']*this.pedido[5]
            ],
            [
              this.lista[3]['article_id']+'        '+this.lista[3]['compamy_description'], this.pedido[7]+'       '+this.lista[3]['price']+'       '+this.lista[3]['price']*this.pedido[7]
            ],
            ['Total                                                                   ','                                                  '+total+' €'],
            ['Aceptado por','']
          ]
        }
      },
        ]
      };
    }

    if(this.lista.length===5)
    {
      total = this.lista[0]['price']*this.pedido[1] + this.lista[1]['price']*this.pedido[3] + this.lista[2]['price']*this.pedido[5] + this.lista[3]['price']*this.pedido[7] + this.lista[4]['price']*this.pedido[9]
      alert('PDF Generado');

        this.docDefinition = {
        content: [
          'Pedido',
      {
        style: 'tableExample',
        table: {
          heights: 10,
          body: [
            [this.DatosCompany[0]['name']+"\n"+"\n"+
            this.DatosCompany[0]['address']+"\n"+"\n"+
            this.DatosCompany[0]['city']+"\n"+"\n"+
            this.DatosCompany[0]['cif']+"\n"+"\n"+
            this.DatosCompany[0]['email'], 'Pedido Nº '+this.num+"\n"+"\n"+"\n"+"\n"+
                                            'Fecha '+this.fecha],
            ['Direccion de envío: C/ Teran n8 2D'+"\n"+"\n"+
            'Fecha de entrega: 08/01/2022'+"\n"+"\n"+
            'Transporte:   A nuestro cargo'+"\n"+"\n"+
            'Forma de pago: En efectivo'+"\n"+"\n"+
            'Condiciones de entrega: ', ''],
            ['ID          Descripcion ',' Cantidad         Precio         Importe'],
            [
              this.lista[0]['article_id']+'       '+this.lista[0]['compamy_description'], this.pedido[1]+'       '+this.lista[0]['price']+'       '+this.lista[0]['price']*this.pedido[1]
            ],
            [
              this.lista[1]['article_id']+'       '+this.lista[1]['compamy_description'], this.pedido[3]+'       '+this.lista[1]['price']+'       '+this.lista[1]['price']*this.pedido[3]
            ],
            [
              this.lista[2]['article_id']+'       '+this.lista[2]['compamy_description'], this.pedido[5]+'       '+this.lista[2]['price']+'       '+this.lista[2]['price']*this.pedido[5]
            ],
            [
              this.lista[3]['article_id']+'       '+this.lista[3]['compamy_description'], this.pedido[7]+'       '+this.lista[3]['price']+'       '+this.lista[3]['price']*this.pedido[7]
            ],
            [
              this.lista[4]['article_id']+'       '+this.lista[4]['compamy_description'], this.pedido[9]+'       '+this.lista[4]['price']+'       '+this.lista[4]['price']*this.pedido[9]
            ],
            ['Total                                                                   ','                                                  '+total+' €'],
            ['Aceptado por','']
          ]
        }
      },
        ]
      };
    }

    else{
      console.log("No");
    }

    this.pdfObj = pdfMake.createPdf(this.docDefinition);
    this.pdfObj.download();
  }


  openPdf()
  {
    if(this.platform.is('cordova')){
      pdfMake.createPdf(this.docDefinition).getBlob(buffer => {
        this.file.resolveDirectoryUrl(this.file.dataDirectory)
          .then(dirEntry => {
            this.file.getFile(dirEntry, 'test1.pdf', { create: true })
              .then(fileEntry => {
                fileEntry.createWriter(writer => {
                  writer.onwrite = () => {
                    this.FileOpener.open(fileEntry.toURL(), 'application/pdf')
                      .then(res => { })
                      .catch(async err => {
                        const alert = this.alertCtrl.create({ message: err.message, buttons: ['Ok'] });
                        (await alert).present();
                      });
                  }
                  writer.write(buffer);
                  alert(this.file.dataDirectory);
                })
              })
              .catch(async err => {
                const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
                (await alert).present();
              });
          })
          .catch(async err => {
            const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
            (await alert).present();
          });
  
      });
    }else{
      this.docDefinition.download();
    }
      this.enviarMail();
  }

  enviarMail()
  {
    let mail = {
      to: this.mail,
      attachments: [
        'file:///data/user/0/io.ionic.starter/files/test1.pdf'
      ],
      subject: 'Pedido',
      body: 'Informe del ultimo pedido',
      isHtml: true
    };
      this.emailComposer.open(mail);
  }

}
