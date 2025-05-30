export interface Admin {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  telefono: string;
  telefonoMovil?: string | null;
  domicilio?: string | null;
  ciudad?: string | null;
  estado?: string | null;
  codigoPostal?: string | null;
  notas?: string | null;
  calendario: string;
  idioma: string;
  zonaHoraria: string;
  recibirNotificaciones: boolean;
  fechaCreacion?: string;
  contrasena?: string;
  reingreseContrasena?: string;
}
