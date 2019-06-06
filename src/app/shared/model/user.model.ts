import { AuthorityModel } from './authority.model';

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  fileId: number;
  authorities?: AuthorityModel[];
}
