import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  api = environment.apiUrl;
  firstname: any;
  secondname: any;
  mail: any;
  pass: any;
  c_password: any;
  company_id: any;
  companies = [];


  constructor(private RestService: RestService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(this.api + "/companies"
      ).subscribe(result => {
        this.companies = result.data;
        console.log(this.companies);
  })
}

  regris() {
    this.RestService.register(this.firstname,this.secondname,this.mail, this.pass, this.c_password,this.company_id)
  }

  mostrarC()
  {
    console.log(this.company_id);
  }

  }
