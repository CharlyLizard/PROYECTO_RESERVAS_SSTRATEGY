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
  fechaCreacion?: string; // Asumiendo que el backend lo envía
  // Campos solo para el formulario, no necesariamente parte del DTO del backend para todas las operaciones
  contrasena?: string;
  reingreseContrasena?: string;
}
