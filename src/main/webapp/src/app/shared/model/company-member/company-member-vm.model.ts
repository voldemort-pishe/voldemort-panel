import {User} from "@app/shared/model/user.model";
import {Company} from "@app/shared/model/company.model";
import {CompanyMember} from "@app/shared/model/company-member/company-member.model";

export class Include {
  user: User;
  company: Company;
}
export class CompanyMemberVm {
  data: CompanyMember;
  include: Include;
}
