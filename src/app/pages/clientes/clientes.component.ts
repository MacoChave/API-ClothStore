import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { clearCliente, ICliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  showModal: boolean = false;
  clientEdit: ICliente = clearCliente();
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
    this.getData();
  }

  getData() {
    this.clienteService.getAll().subscribe({
      next: (v) => (this.clientList = this.filterClient = v),
      error: (err) => alert(err),
      complete: () => console.info('Complete'),
    });
  }

  filterSubmit(): void {
    console.log(this.filterForm.value);
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
        (value) => value.razon.toLowerCase() === filterWord.toLowerCase()
      );
    } else if (this.filterForm.get('codigo')?.value !== '') {
      let filterWord: string = this.filterForm.get('codigo')?.value;
      this.filterClient = this.clientList.filter((value) =>
        value.id?.toString().includes(filterWord)
      );
    } else {
      let filterWord: string = this.filterForm.get('ruc')?.value;
      this.filterClient = this.clientList.filter((value) =>
        value.ruc?.toString().includes(filterWord)
      );
    }
  }

  filterClear(): void {
    // this.filterClient this.clientList.filter(value => {
    //   return (!(value.telefono > 1256 && value.telefono < 12356))
    // })
    this.filterClient = this.clientList;
    this.filterForm.patchValue({
      keyword: '',
      razon: '',
      codigo: '',
      ruc: '',
    });
  }

  editClient(cliente: ICliente): void {
    this.clientEdit = cliente;
    this.openModal();
  }

  openModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(state: boolean): void {
    this.showModal = !this.showModal;
    this.getData();
    this.clientEdit = clearCliente();
  }
}
