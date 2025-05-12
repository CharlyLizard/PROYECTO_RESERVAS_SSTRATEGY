import { Servicio } from "../servicios/servicio";

export interface Proveedor {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  telefono: string;
  telefonoMovil: string;
  domicilio: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  notas: string;
  servicio: {
      id: number | null;
    };
}
