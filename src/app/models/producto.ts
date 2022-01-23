export interface IProducto {
  id: number;
  imagen: string;
  deporte: string;
  modelo: string;
  sexo: string;
  tela: string;
  talla: string;
  costo_t: number;
  costo_a: number;
  descripcion: string;
}

export const clearProducto = () => {
  return {
    id: 0,
    imagen: '',
    deporte: '',
    modelo: '',
    sexo: '',
    tela: '',
    talla: '',
    costo_t: 0,
    costo_a: 0,
    descripcion: '',
  };
};
