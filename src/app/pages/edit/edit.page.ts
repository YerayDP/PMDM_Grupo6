import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  firstname: any;
  secondname: any;
  mail: any;
  pass: any;
  c_password: any;
  company_id: any;

  constructor() { }

  ngOnInit() {
  }

}
