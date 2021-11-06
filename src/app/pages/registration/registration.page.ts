import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  firstname: any;
  secondname: any;
  mail: any;
  pass: any;
  c_password: any;
  company_id: any;


  constructor(private RestService: RestService) { }

  ngOnInit() {
  }

  regris() {
    this.RestService.register(this.firstname,this.secondname,this.mail, this.pass, this.c_password,this.company_id)
  }

}
