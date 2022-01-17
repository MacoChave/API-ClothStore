import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';
import { IsLoggedInGuard } from './guards/isLoggedIn.guard';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SesionComponent } from './pages/sesion/sesion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sesion',
    pathMatch: 'full',
  },
  {
    path: 'sesion',
    component: SesionComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full',
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'productos',
        component: ProductosComponent,
      },
      {
        path: 'cotizaciones',
        component: CotizacionesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
