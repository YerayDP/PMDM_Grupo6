import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalArticulosPageRoutingModule } from './modal-articulos-routing.module';

import { ModalArticulosPage } from './modal-articulos.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalArticulosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalArticulosPage]
})
export class ModalArticulosPageModule {}


