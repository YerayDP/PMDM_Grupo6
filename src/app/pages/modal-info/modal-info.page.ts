import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() user : any;

  api = environment.apiUrl;
  firstname: any;
  secondname: any;
  mail: any;
  pass: any;
  company_id: any;
  companies = [];


  constructor(private modalCtrl: ModalController, private http: HttpClient, private restService: RestService) { }

  ngOnInit() {
    this.http.get<any>(this.api + "/companies"
      ).subscribe(result => {
        this.companies = result.data;
        console.log(this.companies);
  })

  }

  salirSinArgumentos()
  {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos()
  {
    this.modalCtrl.dismiss({
      firstname: this.firstname,
      secondname: this.secondname,
      email: this.mail,
      password: this.pass,
      company_id: this.company_id
      

    });
    this.restService.editar(this.restService.token, this.user.id, this.firstname, this.secondname, this.mail, this.pass, this.company_id);
  }

  /*datosU()
  {
    this.restService.user(this.restService.token)
    .then( data => {
      this.usuario = data;
    });
  }*/

}
