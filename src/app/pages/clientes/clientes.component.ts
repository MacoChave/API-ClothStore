import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  showModal: boolean = false;
  clientList: ICliente[] = [];
  filterClient: ICliente[] = [];
  filterForm: FormGroup = new FormGroup({
    keyword: new FormControl(''),
    razon: new FormControl(''),
    codigo: new FormControl(''),
    ruc: new FormControl(''),
  });

  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe({
      next: (v) => (this.clientList = this.filterClient = v),
      error: (err) => console.error(err),
      complete: () => console.info('Complete'),
    });
  }

  filterSubmit(): void {
    if (this.filterForm.get('keyword')?.value !== '') {
      let filterWord = this.filterForm.get('keyword')?.value;
      this.filterClient = this.clientList.filter((value) => {
        return (
          value.nombre.toLowerCase().includes(filterWord.toLowerCase()) ||
          value.apellido.toLowerCase().includes(filterWord.toLowerCase()) ||
          value.correo.toLowerCase().includes(filterWord.toLowerCase()) ||
          value.direccion.toLowerCase().includes(filterWord.toLowerCase()) ||
          value.razon.toLowerCase().includes(filterWord.toLowerCase()) ||
          value.ruc === filterWord ||
          value.telefono === filterWord
        );
      });
    } else if (this.filterForm.get('razon')?.value !== '') {
      let filterWord: string = this.filterForm.get('razon')?.value;
      this.filterClient = this.clientList.filter(
        (value) => value.razon.toLowerCase() == filterWord.toLowerCase()
      );
    } else if (this.filterForm.get('codigo')?.value !== '') {
      let filterWord: number = this.filterForm.get('codigo')?.value;
      this.filterClient = this.clientList.filter(
        (value) => value.id === filterWord
      );
    } else {
      let filterWord: number = this.filterForm.get('ruc')?.value;
      this.filterClient = this.clientList.filter(
        (value) => value.ruc === filterWord
      );
    }
  }

  filterClear(): void {
    this.filterClient = this.clientList;
    this.filterForm.patchValue({
      keyword: '',
      razon: '',
      codigo: '',
      ruc: '',
    });
  }

  openModal(): void {
    this.showModal = true;
    console.log('Agregando nuevo cliente');
  }
}
