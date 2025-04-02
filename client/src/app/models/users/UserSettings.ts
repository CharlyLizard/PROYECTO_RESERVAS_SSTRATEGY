export interface UserSettings {
  username?: string;
  password?: string;
  salt?: string;
  [key: string]: any;  // Para propiedades dinámicas
}
