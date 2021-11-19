import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsUPageRoutingModule } from './tabs-u-routing.module';

import { TabsUPage } from './tabs-u.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsUPageRoutingModule
  ],
  declarations: [TabsUPage]
})
export class TabsUPageModule {}
