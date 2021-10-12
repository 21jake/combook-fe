import { ISemester } from "./semester.model";
import { ISubject } from "./subject.model";
import { IUser } from "./user.model";

export interface IResult {
    score_type_1?: number,
    score_type_2?: number,
    score_type_3?: number,
    score_type_4?: number,
    average?: number,
    _id: string,
    student: IUser,
    semester: ISemester,
    subject: ISubject
};