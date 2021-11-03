import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    mail: any;
    pass: any;

  constructor(private RestService: RestService) {  }

  ngOnInit() {
    
 }
 log() {
  this.RestService.login(this.mail, this.pass)
}
guardarDatos(){
  console.log(this.mail);
}
 
}
