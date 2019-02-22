import { CompanyModel } from "@app/shared/model/company.model";
import { File } from "@app/shared/model/file.model";
import { User } from "@app/shared/model/user.model";

export class CompanyIncludeModel {
  file: File;
  user: User;
}

export class CompanyContentModel {
  data: CompanyModel;
  include: CompanyIncludeModel;
}
