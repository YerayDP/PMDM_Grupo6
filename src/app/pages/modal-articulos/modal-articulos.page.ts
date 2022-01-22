import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonSearchbar,LoadingController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalPrecioPage } from '../modal-precio/modal-precio.page';

@Component({
  selector: 'app-modal-articulos',
  templateUrl: './modal-articulos.page.html',
  styleUrls: ['./modal-articulos.page.scss'],
})
export class ModalArticulosPage implements OnInit {

  @Input() p : any;

  @ViewChild('search', {static:false}) search: IonSearchbar;
  items2:any;
  items:any;
  articulos: any = [];
  searchField: FormControl;
  articulosFin: any[] = [];
  ps: any;

  constructor(private modalCtrl: ModalController, private restService: RestService, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.rellenar();

    this.showLoading();

    this.ps=this.restService.numProductos

  }
  ionViewDidEnter(){
    setTimeout(() =>{
      this.search.setFocus();
    })
  }

  getItems(ev:any){

    this.items2=this.articulosFin
    const val = ev.target.value;
    if (val && val.trim()!='') {
      this.items2 = this.items.filter((item : any)=>{
        return (item.description.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }

  obtenerArticulos()
  {
  this.restService.obtenerArticulos(this.restService.token)
    .then(data => {
      this.articulos = data;
      this.items=this.articulosFin;
      this.items2=this.articulosFin;
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
    this.modalCtrl.dismiss();
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
    setTimeout(() => {
      this.obtenerArticulos();
      loading.dismiss();
    }, 500 );
   }

 rellenar()
 {
   var articulos2 :any[] = [];
   var productos_id: any[] =[];
   
   for(let i = 0; i<this.p.length;i++)
   {
    var id = this.p[i].article_id;
    productos_id.push(id);
   }
   

    for(let i = 0; i < this.restService.articulosS.data.length;i++)
    {
      var id = this.restService.articulosS.data[i].id;
      articulos2.push(id);
    }
    console.log(productos_id);
    console.log(articulos2);

    this.articulos=this.restService.articulosS.data
    console.log(this.articulos)
    
    var listaId = articulos2.filter(e=>!productos_id.includes(e));
    for(let i =0; i<this.articulos.length; i++){
      for(let j =0; j<listaId.length; j++){
        if(listaId[j]==this.articulos[i].id){
          this.articulosFin.push(this.articulos[i])
        }
      }
      
    }
    console.log(this.articulosFin);
    
 }
}
