export interface IGrade {
  _id: string;
  name: string;
}

export interface INewGrade extends Omit<IGrade, '_id'> {
  _id?: string;
}
