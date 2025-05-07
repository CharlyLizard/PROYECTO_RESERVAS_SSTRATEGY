export interface Categoria {
  id?: number; // Opcional al crear una nueva
  nombre: string;
  descripcion: string;
  fechaCreacion?: string; // El backend la asigna
}
