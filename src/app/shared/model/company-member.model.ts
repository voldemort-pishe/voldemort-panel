import { UserModel } from './user.model';
import { CompanyModel } from './company.model';

export interface CompanyMemberModel {
  id?: number;
  companyId?: number;
  userEmail?: string;
  department?: string;
  position?: string;
}

export interface CompanyMemberContentModel {
  data: CompanyMemberModel;
  include: {
    user: UserModel;
    company: CompanyModel;
  };
}
