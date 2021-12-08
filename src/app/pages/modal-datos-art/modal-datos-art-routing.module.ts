import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDatosArtPage } from './modal-datos-art.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDatosArtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDatosArtPageRoutingModule {}
