import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDetalle } from 'src/app/models/cotizacion';
import { clearProducto, IProducto } from 'src/app/models/producto';
import { DetalleService } from 'src/app/services/detalle.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'cotizacion-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  host: { class: 'rootModal' },
})
export class DetalleComponent implements OnInit {
  @Input() id_cotizacion: number | undefined = 0;
  @Output() closeEvent = new EventEmitter<boolean>();
  productos: IProducto[] = [];
  producto: IProducto = clearProducto();
  detalles: IDetalle[] = [];

  detalleForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    id_cotizacion: new FormControl(0, Validators.required),
    id_producto: new FormControl(0, Validators.required),
    cantidad: new FormControl(0, Validators.required),
  });

  constructor(
    private productoService: ProductosService,
    private detalleService: DetalleService
  ) {
    this.getProductos();
  }

  ngOnInit(): void {
    this.detalleForm.get('id_cotizacion')?.setValue(this.id_cotizacion);
    this.getDetalle();
  }

  getDetalle() {
    this.detalleService.getAll(this.id_cotizacion).subscribe({
      next: (v) => (this.detalles = v),
      error: (err) => alert(err),
      complete: () => {},
    });
  }

  getProductos() {
    this.productoService.getAll().subscribe({
      next: (v) => (this.productos = v),
      error: (err) => alert(err),
      complete: () => console.info('Complete'),
    });
  }

  changeProduct(event: any): void {
    this.producto = this.productos[event.target.selectedIndex - 1];
  }

  closeModal(): void {
    this.closeEvent.emit(true);
  }

  detalleSubmit(): void {
    this.detalleService.create(this.detalleForm.value).subscribe({
      next: (v) => alert(v.message),
      error: (err) => alert(err.message),
      complete: () => {
        this.producto = clearProducto();
        this.detalleForm.setValue({
          id: 0,
          id_cotizacion: this.id_cotizacion,
          id_producto: 0,
          cantidad: 0,
        });
        this.getDetalle();
      },
    });
  }

  deleteSubmit(id: any): void {
    this.detalleService.delete(id).subscribe({
      next: (v) => alert(v.message),
      error: (err) => alert(err),
      complete: () => this.getDetalle(),
    });
  }
}
