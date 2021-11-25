import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalPrecioPage } from '../modal-precio/modal-precio.page';

@Component({
  selector: 'app-modal-articulos',
  templateUrl: './modal-articulos.page.html',
  styleUrls: ['./modal-articulos.page.scss'],
})
export class ModalArticulosPage implements OnInit {


  @ViewChild('search', {static:false}) search: IonSearchbar;
  items2:any
  items:any
  articulos: any = [];
  searchField: FormControl;

  constructor(private modalCtrl: ModalController, private restService: RestService) { 
    
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

  ngOnInit() {
    this.restService.obtenerArticulos(this.restService.token)
    .then(data => {
      this.articulos = data;
      this.items=this.articulos.data;
      this.items2=this.items;
  });  
  }
  ionViewDidEnter(){
    setTimeout(() =>{
      this.search.setFocus();
    })
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

}
