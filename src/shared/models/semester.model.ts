import { IGrade } from "./grade.model";

export interface ISemester {
    _id: string;
    name: string;
    fee: number;
    grade?: IGrade
}

export interface INewSemester extends Omit<ISemester, '_id'> {
    _id?: string;
}
