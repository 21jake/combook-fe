export interface ISubject {
    _id: string,
    name: string
};
export interface INewSubject extends Omit<ISubject, '_id'> {
    _id?: string;
  }
  