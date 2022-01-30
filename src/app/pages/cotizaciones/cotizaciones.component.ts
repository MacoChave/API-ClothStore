import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { clearCotizacion, ICotizacion } from 'src/app/models/cotizacion';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css'],
})
export class CotizacionesComponent implements OnInit {
  showModalCotizacion: boolean = false;
  cotizacionEdit: ICotizacion = clearCotizacion();
  cotizacionList: ICotizacion[] = [];
  filterCotizacion: ICotizacion[] = [];

  filterForm: FormGroup = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    month: new FormControl(''),
  });

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

  filterSubmit() {
    this.filterCotizacion = this.cotizacionList;
    let monthFilter = this.filterForm.value.month;
    let fromFilter = this.filterForm.value.fromDate;
    let toFilter = this.filterForm.value.toDate;

    if (monthFilter !== '') {
      let currentMonth = new Date().getMonth();
      let month =
        monthFilter === 'current'
          ? currentMonth
          : currentMonth === 0
          ? 11
          : currentMonth;
      this.filterCotizacion = this.filterCotizacion.filter((value) => {
        return new Date(value.fecha_creada).getMonth() === month;
      });
    } else if (fromFilter !== '' && toFilter !== '') {
      let fromDate = new Date(fromFilter);
      let toDate = new Date(toFilter);
      this.filterCotizacion = this.filterCotizacion.filter((value) => {
        return (
          new Date(value.fecha_creada) > fromDate &&
          new Date(value.fecha_creada) < toDate
        );
      });
    } else {
      alert('Seleccionar el rango de fecha a filtrar');
    }
  }

  cleanFilters() {
    this.filterForm.setValue({
      month: '',
      fromDate: '',
      toDate: '',
    });
    console.log(this.filterForm.value);
  }

  editCotizacion(cotizacion: ICotizacion): void {
    this.cotizacionEdit = cotizacion;
    this.openModal();
  }

  pdfCotizacion(cotizacion: ICotizacion): void {
    this.cotizacionService.getReporte(cotizacion.id).subscribe((data) => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'reporte.pdf';
      link.click();
    });
  }

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

  closeModal(state: boolean): void {
    this.showModalCotizacion = !this.showModalCotizacion;
    this.getData();
    this.cotizacionEdit = clearCotizacion();
  }
}
