import { UserSettings } from "./UserSettings";

export interface User {
  id?: number;
  firstName: string;    // first_name
  lastName: string;     // last_name
  email: string;
  mobile?: string;      // mobile_number
  phone: string;        // phone_number
  address?: string;
  city?: string;
  state?: string;
  zip?: string;        // zip_code
  timezone?: string;
  language?: string;
  ldapDn?: string;     // ldap_dn
  notes?: string;
  roleId: number;      // id_roles
  settings?: UserSettings;

  // Campos de auditoría
  createDatetime?: string;
  updateDatetime?: string;
}
