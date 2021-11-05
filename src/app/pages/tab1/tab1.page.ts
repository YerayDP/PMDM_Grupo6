import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading: any;
  usuarios: any=[];

  
  constructor(private restService: RestService, private loadingCtrl: LoadingController) { 
    
    
   }

   ngOnInit(){
    this.showLoading();
    
   
  }
  verUsuarios() {
    this.restService.obtenerUsuarios(this.restService.token)
    
    .then(data => {
        this.usuarios = data;
        
    });
   

  }

  async showLoading() {  
    const loading = await this.loadingCtrl.create({  
    message: 'Loading.....'   
    });  
    loading.present();  
    setTimeout(() => {  
      loading.dismiss();  
      this.verUsuarios()
    }, 500 );  
 }   
  
  }

    
  


