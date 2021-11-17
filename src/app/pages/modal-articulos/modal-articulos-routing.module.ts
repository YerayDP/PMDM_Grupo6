import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalArticulosPage } from './modal-articulos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalArticulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalArticulosPageRoutingModule {}
