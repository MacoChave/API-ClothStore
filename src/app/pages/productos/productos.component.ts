import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { clearProducto, IProducto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  showModal: boolean = false;
  productoEdit: IProducto = clearProducto();
  productoList: IProducto[] = [];
  filterProducto: IProducto[] = [];
  // filterForm: FormGroup = new FormGroup({})

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productoService.getAll().subscribe({
      next: (v) => (this.filterProducto = this.productoList = v),
      error: (err) => alert(err),
      complete: () => console.info('Complete'),
    });
  }

  filterSubmit(): void {}

  filterClear(): void {}

  editProducto(producto: IProducto): void {
    this.productoEdit = producto;
    this.openModal();
  }

  openModal() {
    this.showModal = !this.showModal;
  }

  closeModal(state: boolean): void {
    this.showModal = !this.showModal;
    this.getData();
    this.productoEdit = clearProducto();
  }
}
