import { Admin } from "./Admin";
import { AdminSettings } from "./AdminSettings";

export class AdminModel {
  id: number;
  name: string;
  email: string;
  role: string;
  settings?: AdminSettings;

  constructor(data: Partial<Admin>) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || '';
    this.settings = data.settings || {};
  }
}
