import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPrecioPage } from './modal-precio.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPrecioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPrecioPageRoutingModule {}
