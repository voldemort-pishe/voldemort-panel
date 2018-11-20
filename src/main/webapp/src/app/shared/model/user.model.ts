import {UserAuthority} from "@app/shared/model/user-authority.model";

export class User {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  userAuthorities: Set<UserAuthority>;
  fileId: number;
}
