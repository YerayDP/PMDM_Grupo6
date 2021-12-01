import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalArticulosPage } from './modal-articulos.page';
import { Tab4PageModule } from '../tab4/tab4.module';

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
