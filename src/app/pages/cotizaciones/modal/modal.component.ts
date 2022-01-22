import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICliente } from 'src/app/models/cliente';
import { clearCotizacion, ICotizacion } from 'src/app/models/cotizacion';
import { ClientesService } from 'src/app/services/clientes.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'cotizacion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  host: { class: 'rootModal' },
})
export class ModalComponent implements OnInit {
  @Input() cotizacion: ICotizacion = clearCotizacion();
  @Output() closeEvent = new EventEmitter<boolean>();
  clientes: ICliente[] = [];

  cotizacionForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    id_cliente: new FormControl(0, Validators.required),
    fecha_creada: new FormControl(''),
    fecha_modificado: new FormControl(''),
    soles: new FormControl('', Validators.required),
    dolares: new FormControl('', Validators.required),
    pesos: new FormControl('', Validators.required),
    nombre: new FormControl(''),
  });

  constructor(
    private cotizacionService: CotizacionService,
    private clienteService: ClientesService
  ) {
    this.getClientes();
  }

  ngOnInit(): void {
    if (this.cotizacion.id !== undefined && this.cotizacion.id !== 0) {
      this.cotizacionForm.setValue(this.cotizacion);
    }
  }

  getClientes(): void {
    this.clienteService.getAll().subscribe({
      next: (v) => (this.clientes = v),
      error: (err) => alert(err),
      complete: () => console.info('Complete'),
    });
  }

  changeClient(event: any): void {
    this.cotizacionForm
      .get('id_cliente')
      ?.setValue(event.target.value, { onlySelf: true });
  }

  closeModal(): void {
    this.closeEvent.emit(true);
  }

  cotizacionSubmit(): void {
    if (this.cotizacion.id !== undefined && this.cotizacion.id === 0) {
      this.cotizacionService.create(this.cotizacionForm.value).subscribe({
        next: (v) => console.log(v),
        error: (err) => alert(err),
        complete: () => this.closeModal(),
      });
    } else {
      this.cotizacionService.update(this.cotizacionForm.value).subscribe({
        next: (v) => console.log(v),
        error: (err) => alert(err),
        complete: () => this.closeModal(),
      });
    }
  }
}
