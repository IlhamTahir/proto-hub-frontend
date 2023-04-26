export interface BaseModel {
  id: string;
  createdTime?: Date;
  updatedTime?: Date;
}

export type ErrorResponse = {
  code: number;
  message: string;
};

export interface Paging {
  page?: number;
  size?: number;
  total?: number;
}

export interface ListResult<T> {
  data: Array<T>;
  paging: Paging;
}
export interface Searchable<T> {
  list(filter: object): Promise<ListResult<T>>;
}
export interface Editable<CreateModel, EditModel, T> {
  create(request: CreateModel): Promise<T>;

  edit(id: string, request: EditModel): Promise<T>;
}
