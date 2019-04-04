export interface Pageable<T> {
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
