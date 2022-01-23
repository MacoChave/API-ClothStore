import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clearCliente, ICliente } from 'src/app/models/cliente';
import {
  clearCotizacion,
  clearDetalle,
  ICotizacion,
  IDetalle,
} from 'src/app/models/cotizacion';
import { clearProducto, IProducto } from 'src/app/models/producto';
import { ClientesService } from 'src/app/services/clientes.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'cotizacion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  host: { class: 'rootModal' },
})
export class ModalComponent implements OnInit {
  @Input() cotizacion: ICotizacion = clearCotizacion();
  @Output() closeEvent = new EventEmitter<boolean>();
  cliente: ICliente = clearCliente();
  producto: IProducto = clearProducto();
  clientes: ICliente[] = []; // GET DATA
  productos: IProducto[] = []; // GET DATA
  detalles: IDetalle[] = []; // GET DATA && INSERT ALL
  detalle: IDetalle = clearDetalle();

  cotizacionForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    id_cliente: new FormControl(0, Validators.required),
    soles: new FormControl('', Validators.required),
    dolares: new FormControl('', Validators.required),
    pesos: new FormControl('', Validators.required),
  });

  // TODO: Replace for detalle var
  detalleForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    id_cotizacion: new FormControl(0, Validators.required),
    id_producto: new FormControl(0, Validators.required),
    cantidad: new FormControl(0, Validators.required),
  });

  constructor(
    private cotizacionService: CotizacionService,
    private clienteService: ClientesService,
    private productoService: ProductosService,
    private detalleService: DetalleService
  ) {
    this.getClientes();
    this.getProductos();
  }

  ngOnInit(): void {
    if (this.cotizacion.id !== 0) {
      this.cotizacionForm.setValue({
        id: this.cotizacion.id,
        id_cliente: this.cotizacion.id_cliente,
        soles: this.cotizacion.soles,
        dolares: this.cotizacion.dolares,
        pesos: this.cotizacion.pesos,
      });
      this.detalleService.getAll(this.cotizacion.id).subscribe({
        next: (v) => (this.detalles = v),
      });
    }
  }

  getClientes(): void {
    this.clienteService.getAll().subscribe({
      next: (v) => (this.clientes = v),
      error: (err) => alert(err),
    });
  }

  getProductos() {
    this.productoService.getAll().subscribe({
      next: (v) => (this.productos = v),
      error: (err) => alert(err),
    });
  }

  changeClient(event: any): void {
    this.cliente = this.clientes[event.target.selectedIndex - 1];
  }

  changeProduct(event: any): void {
    this.producto = this.productos[event.target.selectedIndex - 1];
  }

  closeModal(): void {
    this.closeEvent.emit(true);
  }

  detalleSubmit(): void {
    this.detalle = this.detalleForm.value;
    this.detalle.imagen = this.producto.imagen;
    this.detalle.descripcion = this.producto.descripcion;
    this.detalle.modelo = this.producto.modelo;
    this.detalle.talla = this.producto.talla;
    this.detalle.costo_t = this.producto.costo_t;
    this.detalle.costo_a = this.producto.costo_a;
    this.detalle.subtotal = this.producto.costo_a * this.detalle.cantidad;

    this.detalles.push(this.detalle);
    this.detalle = clearDetalle();
  }

  deleteDetalle(detalle: IDetalle): void {
    if (this.cotizacion.id !== 0 && detalle.id !== 0) {
      this.detalleService.delete(detalle.id).subscribe({
        next: (v) => alert(v.message),
        error: (err) => alert(err),
      });
    } else {
      this.detalles = this.detalles.filter(
        (detalleItem) => detalleItem.id !== detalle.id
      );
    }
  }

  cotizacionSubmit(): void {
    if (this.cotizacion.id === 0) {
      this.detalles = this.detalles.filter(
        (detalleItem) => detalleItem.id === 0
      );

      this.cotizacionService.create(this.cotizacionForm.value).subscribe({
        next: (v) => {
          this.detalles = this.detalles.map((value) => {
            value.id_cotizacion = v.id;
            return value;
          });
        },
        error: (err) => alert(err),
        complete: () => {
          this.detalleService.createAll(this.detalles).subscribe({
            error: (err) => alert(err),
            complete: () => this.closeModal(),
          });
        },
      });
    } else {
      let detallesToCreate = this.detalles.filter(
        (detalleItem) => detalleItem.id === 0
      );
      let detallesToUpdate = this.detalles.filter(
        (detalleItem) => detalleItem.id !== 0
      );
      this.cotizacionService.update(this.cotizacionForm.value).subscribe({
        next: (v) => {
          detallesToCreate.map((value) => {
            value.id_cotizacion = this.cotizacion.id;
          });
        },
        error: (err) => alert(err),
        complete: () => {
          this.detalleService.createAll(detallesToCreate).subscribe({
            next: (v) => alert(v.message),
            error: (err) => alert(err),
            complete: () => {
              // this.closeModal();
            },
          });
        },
      });
    }
  }
}
