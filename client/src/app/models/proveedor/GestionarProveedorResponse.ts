import { Proveedor } from './proveedor.model';

export interface GestionarProveedorResponse {
  proveedores: Proveedor[];
  proveedor?: Proveedor;
}
