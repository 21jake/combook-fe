import { ISemester } from './semester.model';
import { IUser } from './user.model';

export interface ITuition {
    id: string;
    semester?: string | ISemester;
    user?: string | IUser;
    isPaid: Boolean;
}

export interface INewTuition extends Omit<ITuition, 'id'> {
    id?: string;
}
