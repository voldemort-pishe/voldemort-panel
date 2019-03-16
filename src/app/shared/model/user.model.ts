import { UserAuthority } from "@app/shared/model/user-authority.model";

export class UserModel {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  userAuthorities: Set<UserAuthority>;
  fileId: number;
}
