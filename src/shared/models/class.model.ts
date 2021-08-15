import { IGrade } from "./grade.model";

export interface IClass {
    id: string,
    name: string,
    grade?: IGrade
}

export interface INewClass extends Omit<IClass, 'id'> {
    id?: string;
  }
  