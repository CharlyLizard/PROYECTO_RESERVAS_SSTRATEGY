export interface Secretario {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  telefono: string;
  telefonoMovil?: string;
  domicilio?: string;
  ciudad?: string;
  estado?: string;
  codigoPostal?: string;
  notas?: string;
  calendario?: string;
  idioma?: string;
  zonaHoraria?: string;
  recibirNotificaciones?: boolean;
  proveedor?: any;
  fechaCreacion?: string;
}
