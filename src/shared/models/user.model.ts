import { Role } from "../enum/role";
import { IClass } from "./class.model";
import { ISubject } from "./subject.model";

export interface IUser {
    role: Role,
    id: string,
    _class?: string | IClass,
    subject?: string | ISubject,
    password: string,
    passwordConfirm: string,
    name: string
    email: string
};

export interface INewUser extends Omit <IUser, 'id'>  {
    id?: string,
}