import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { SesionComponent } from './pages/sesion/sesion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModalComponent as ClienteModal } from './pages/clientes/modal/modal.component';
import { ModalComponent as ProductoModal } from './pages/productos/modal/modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    ProductosComponent,
    CotizacionesComponent,
    SesionComponent,
    DashboardComponent,
    ClienteModal,
    ProductoModal,
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
