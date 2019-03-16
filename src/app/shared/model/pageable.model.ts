export interface Pageable {
  first?: boolean;
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  numberOfElements?: number;
  size?: number;
  content?: any;
  number?: number;
  sort?: any;
}

export interface PageableGeneric<T> {
  content: T[];
  sort: any;
  size: number;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
}
