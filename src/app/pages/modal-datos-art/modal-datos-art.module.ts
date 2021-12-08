import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDatosArtPageRoutingModule } from './modal-datos-art-routing.module';

import { ModalDatosArtPage } from './modal-datos-art.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDatosArtPageRoutingModule
  ],
  declarations: [ModalDatosArtPage]
})
export class ModalDatosArtPageModule {}
