import { Role } from '../enum/role';
import { IClass } from './class.model';
import { ISubject } from './subject.model';

export interface IAuth {
  _id: string;
  role: Role;
  active: boolean;
  name: string;
  email: string;
  subject?: ISubject;
  _class?: string | IClass,

}
