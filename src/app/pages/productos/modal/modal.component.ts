import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clearProducto, IProducto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'producto-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  host: { class: 'rootModal' },
})
export class ModalComponent implements OnInit {
  @Input() producto: IProducto = clearProducto();
  @Output() closeEvent = new EventEmitter<boolean>();

  sexoArr: string[] = ['Male', 'Female', 'Mix'];
  tallaArr: string[] = ['Small', 'Medium', 'Large', 'Extra-Large'];

  productoForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    imagen: new FormControl('', Validators.required),
    deporte: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    tela: new FormControl('', Validators.required),
    talla: new FormControl('', Validators.required),
    costo_t: new FormControl(0, Validators.required),
    costo_a: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
  });

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    if (this.producto.id !== undefined && this.producto.id !== 0) {
      this.productoForm.setValue(this.producto);
    }
  }

  imageChanged(element: any): void {
    let file = element.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onloadend = () => {
      let base64: string = `${reader.result}`;
      this.productoForm.get('imagen')?.setValue(base64);
    };

    reader.readAsDataURL(file);
  }

  closeModal(): void {
    this.closeEvent.emit(true);
  }

  productoSubmit(): void {
    if (this.producto.id !== undefined && this.producto.id === 0) {
      this.productoService.create(this.productoForm.value).subscribe({
        error: (err) => alert(err),
        complete: () => this.closeModal(),
      });
    } else {
      this.productoService.update(this.productoForm.value).subscribe({
        error: (err) => alert(err),
        complete: () => this.closeModal(),
      });
    }
  }
}
