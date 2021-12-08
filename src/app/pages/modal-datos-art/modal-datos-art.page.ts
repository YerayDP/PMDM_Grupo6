import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-datos-art',
  templateUrl: './modal-datos-art.page.html',
  styleUrls: ['./modal-datos-art.page.scss'],
})
export class ModalDatosArtPage implements OnInit {

  @Input() art : any;

  id:any;
  num:any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.id=this.art.id
    this.num=this.art.num
  }

  salirSinArgumentos()
  {
    this.modalCtrl.dismiss();
  }

}
