import { Role } from '../enum/role';

export interface IUser {
  id: string;
  role: Role;
  active: boolean;
  name: string;
  email: string;
}
