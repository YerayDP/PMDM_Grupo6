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
  items2:any
  items:any
  articulos: any = [];
  searchField: FormControl;
  articulosFin: any = [];
  articulos_id :any = [];
  productos_id: any =[];

  constructor(private modalCtrl: ModalController, private restService: RestService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    //console.log(this.restService.articulosS.data)

    this.rellenar();

    this.showLoading();

    console.log(this.p);
  }
  ionViewDidEnter(){
    setTimeout(() =>{
      this.search.setFocus();
    })
  }

  getItems(ev:any){

    
    const val = ev.target.value;
    this.items2=this.items;
    if (val && val.trim()!='') {
      this.items2 = this.items.filter((item : any)=>{
        console.log(item.description)
        return (item.description.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }

  obtenerArticulos()
  {
  this.restService.obtenerArticulos(this.restService.token)
    .then(data => {
      this.articulos = data;
      this.items=this.articulos.data;
      this.items2=this.items;
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
    this.obtenerArticulos();
    setTimeout(() => {
      loading.dismiss();
    }, 500 );
    

 }

 rellenar()
 {
   /*
   //console.log(this.restService.articulosS.data[4].id);
    for(let i = 0; i<=this.restService.articulosS.data.length;i++)
    {
      const id = this.restService.articulosS.data[i].id;
      this.articulos_id.push(id);
      
    }
    console.log(this.articulos_id);
    for(let i = 1; i<=this.p.data.length;i++)
    {
      const id = this.p.data[i].id;
      this.productos_id.push(id);
      console.log(this.productos_id);
    }

    
   */
 }
}
