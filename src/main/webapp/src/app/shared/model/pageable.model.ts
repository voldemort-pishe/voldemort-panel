export interface Pageable {
  first?: boolean;
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  numberOfElements?: number;
  size?: number;
  content?:any;
  number?:number;
  sort?:any;
}
