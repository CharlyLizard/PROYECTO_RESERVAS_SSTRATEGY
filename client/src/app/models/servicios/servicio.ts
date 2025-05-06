export interface Servicio {
  id: number;
  nombre: string;
  duracionMinutos: number;
  precio: number;
  moneda: string;
  categoriaId: number;
  categoriaNombre: string;

  tiposDisponibles: string;
  numeroAsistentes: number;
  ubicacion: string | null;
  color: string;
  ocultarPublico: boolean;
  descripcion: string;
  fechaCreacion: string;
  isSelected: boolean;
}
