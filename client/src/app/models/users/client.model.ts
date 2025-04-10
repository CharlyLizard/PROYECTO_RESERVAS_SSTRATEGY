export interface Client {
  id?: number; // ID único del cliente
  name: string; // Nombre completo
  email: string; // Correo electrónico
  phone: string; // Teléfono de contacto
  address?: string; // Dirección (opcional)
  city?: string; // Ciudad (opcional)
  postalCode?: string; // Código postal (opcional)
}
