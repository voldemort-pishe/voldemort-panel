import {User} from "@app/shared/model/user.model";
import {CompanyModel} from "@app/shared/model/company.model";
import {CompanyMember} from "@app/shared/model/company-member/company-member.model";

export class Include {
  user: User;
  company: CompanyModel;
}
export class CompanyMemberVm {
  data: CompanyMember;
  include: Include;
}
