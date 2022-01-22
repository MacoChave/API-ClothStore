export interface ICotizacion {
  id?: number;
  id_cliente: number;
  fecha_creada: string;
  fecha_modificado: string;
  soles: number;
  dolares: number;
  pesos: number;
  nombre: string;
}

export interface IDetalle {
  id?: number;
  id_cotizacion: number;
  id_producto: number;
  cantidad: number;
  imagen: string;
  modelo: string;
  descripcion: string;
  talla: string;
  costo_t: number;
  costo_a: number;
  subtotal: number;
}

export const clearCotizacion = () => {
  return {
    id: 0,
    id_cliente: 0,
    fecha_creada: '',
    fecha_modificado: '',
    soles: 0,
    dolares: 0,
    pesos: 0,
    nombre: '',
  };
};

export const clearDetalle = () => {
  return {
    id: 0,
    id_cotizacion: 0,
    id_producto: 0,
    cantidad: 0,
    imagen: '',
    modelo: '',
    sexo: '',
    talla: '',
    costo_t: 0,
    costo_a: 0,
    subtotal: 0,
  };
};
