import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalHacerPedidoPageRoutingModule } from './modal-hacer-pedido-routing.module';

import { ModalHacerPedidoPage } from './modal-hacer-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalHacerPedidoPageRoutingModule
  ],
  declarations: [ModalHacerPedidoPage]
})
export class ModalHacerPedidoPageModule {}
