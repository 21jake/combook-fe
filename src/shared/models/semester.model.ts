export interface ISemester {
    _id: string;
    name: string;
    fee: number;
}

export interface INewSemester extends Omit<ISemester, '_id'> {
    _id?: string;
}
