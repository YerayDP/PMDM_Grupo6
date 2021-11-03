import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  usuarios: any=[];

  constructor(private restService: RestService) { 
    
   }

  
  ngOnInit() {
    this.restService.obtenerUsuarios(this.restService.token)
    
    .then(data => {
        this.usuarios = data;
        
    });
  }
  
}
    
  


