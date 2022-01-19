import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clearCliente, ICliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'cliente-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  host: { class: 'rootModal' },
})
export class ModalComponent implements OnInit {
  @Input() cliente: ICliente = clearCliente();
  @Output() closeEvent = new EventEmitter<boolean>();

  clientForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    razon: new FormControl('', Validators.required),
    ruc: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  });

  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    if (this.cliente.id !== undefined && this.cliente.id !== 0) {
      this.clientForm.setValue(this.cliente);
    }
  }

  closeModal(): void {
    this.closeEvent.emit(true);
  }

  clientSubmit(): void {
    if (this.cliente.id !== undefined && this.cliente.id === 0) {
      this.clienteService.create(this.clientForm.value).subscribe({
        next: (v) => console.log(v),
        error: (err) => alert(err),
        complete: () => console.info('Complete'),
      });
    } else {
      this.clienteService.update(this.clientForm.value).subscribe({
        next: (v) => console.log(v),
        error: (err) => alert(err),
        complete: () => console.info('Complete'),
      });
    }
    this.closeModal();
  }
}
