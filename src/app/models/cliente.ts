export interface ICliente {
  id?: number;
  nombre: string;
  apellido: string;
  razon: string;
  ruc: number;
  direccion: string;
  telefono: number;
  correo: string;
}

export const clearCliente = () => {
  return {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    razon: '',
    ruc: 0,
    telefono: 0,
  };
};
