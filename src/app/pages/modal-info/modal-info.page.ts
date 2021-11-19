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
    console.log(this.user)
    this.modalCtrl.dismiss({
    });
    this.restService.editar(this.restService.token, this.user.id, this.user.firstname, this.user.secondname, this.user.email, this.user.password, this.user.company_id);
  }

}
