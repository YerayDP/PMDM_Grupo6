import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalElegirEmpresaPageRoutingModule } from './modal-elegir-empresa-routing.module';

import { ModalElegirEmpresaPage } from './modal-elegir-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalElegirEmpresaPageRoutingModule
  ],
  declarations: [ModalElegirEmpresaPage]
})
export class ModalElegirEmpresaPageModule {}
