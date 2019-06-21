import { Permission } from './enumeration/permission';

export interface AuthorityModel {
  id: number;
  authorityName: string;
  permissions: Permission[];
  userId: number;
}
