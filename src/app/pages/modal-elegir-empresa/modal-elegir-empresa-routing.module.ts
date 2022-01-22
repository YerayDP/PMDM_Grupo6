import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalElegirEmpresaPage } from './modal-elegir-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: ModalElegirEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalElegirEmpresaPageRoutingModule {}
