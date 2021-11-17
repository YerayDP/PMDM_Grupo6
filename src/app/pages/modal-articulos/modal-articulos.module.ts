import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalArticulosPageRoutingModule } from './modal-articulos-routing.module';

import { ModalArticulosPage } from './modal-articulos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalArticulosPageRoutingModule
  ],
  declarations: [ModalArticulosPage]
})
export class ModalArticulosPageModule {}
