import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalArticulosPageModule } from './pages/modal-articulos/modal-articulos.module';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


//import { File } from '@ionic-native/file/ngx';
//import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalArticulosPageModule,
    ReactiveFormsModule,
  ],
  providers: [
    PDFGenerator,
    EmailComposer,
    AndroidPermissions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
