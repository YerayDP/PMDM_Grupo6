import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalHacerPedidoPage } from './modal-hacer-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalHacerPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalHacerPedidoPageRoutingModule {}
