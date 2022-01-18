import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { SesionComponent } from './pages/sesion/sesion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './pages/clientes/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    ProductosComponent,
    CotizacionesComponent,
    SesionComponent,
    DashboardComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
