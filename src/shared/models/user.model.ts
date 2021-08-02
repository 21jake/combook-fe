import { Role } from '../enum/role';

export interface IUser {
  _id: string;
  role: Role;
  active: boolean;
  name: string;
  email: string;
}
