import { Component, OnInit } from '@angular/core';
import { clearCotizacion, ICotizacion } from 'src/app/models/cotizacion';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css'],
})
export class CotizacionesComponent implements OnInit {
  showModalCotizacion: boolean = false;
  // showModalDetalle: boolean = false;
  cotizacionEdit: ICotizacion = clearCotizacion();
  cotizacionList: ICotizacion[] = [];
  filterCotizacion: ICotizacion[] = [];
  // filterForm: FormGroup = new FormGroup({})

  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.cotizacionService.getAll().subscribe({
      next: (v) => (this.cotizacionList = this.filterCotizacion = v),
      error: (err) => alert(err),
      complete: () => console.info('Complete'),
    });
  }

  filterSubmit(): void {}

  filterClear(): void {}

  editCotizacion(cotizacion: ICotizacion): void {
    this.cotizacionEdit = cotizacion;
    this.openModal();
  }

  // addDetalleCotizacion(cotizacion: ICotizacion): void {
  //   this.cotizacionEdit = cotizacion;
  //   this.openDetalleModal();
  // }

  deleteCotizacion(id: number | undefined): void {
    if (id === undefined) return;
    this.cotizacionService.delete(id).subscribe({
      next: (v) => alert(v.message),
      error: (err) => alert(err.message),
      complete: () => this.getData(),
    });
  }

  openModal() {
    this.showModalCotizacion = !this.showModalCotizacion;
  }

  // openDetalleModal() {
  //   this.showModalDetalle = !this.showModalDetalle;
  // }

  // closeDetalleModal() {
  //   this.showModalDetalle = !this.showModalDetalle;
  //   this.cotizacionEdit = clearCotizacion();
  // }

  closeModal(state: boolean): void {
    this.showModalCotizacion = !this.showModalCotizacion;
    this.getData();
    this.cotizacionEdit = clearCotizacion();
  }
}
