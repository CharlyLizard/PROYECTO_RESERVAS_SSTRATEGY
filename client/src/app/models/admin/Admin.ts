import { AdminSettings } from "./AdminSettings";

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  settings?: AdminSettings;
}
