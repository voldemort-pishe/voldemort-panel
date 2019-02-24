import { UserModel } from "@app/shared/model/user.model";
import { CompanyModel } from "@app/shared/model/company.model";
import { CompanyMemberModel } from "@app/shared/model/company-member/company-member.model";

export class CompanyMemberIncludeModel {
  user: UserModel;
  company: CompanyModel;
}

export class CompanyMemberContentModel {
  data: CompanyMemberModel;
  include: CompanyMemberIncludeModel;
}
