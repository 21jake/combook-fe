export interface IInitialState {
  fetchEntitiesSuccess: boolean;
  fetchEntitySuccess: boolean;
  updateEntitySuccess: boolean;
  deleteEntitySuccess: boolean;
  loading: boolean;
  errorMessage: string | null;
  totalItems: number;
}

export interface IParams {
  limit: number;
  page: number;
}

export interface IGetEntitiesResp<T> {
  total: number;
  entities: Array<T>;
}
