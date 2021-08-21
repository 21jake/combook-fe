import { Role } from '../enum/role';

export interface IAuth {
  _id: string;
  role: Role;
  active: boolean;
  name: string;
  email: string;
}
