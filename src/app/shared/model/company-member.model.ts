import { UserModel } from './user.model';
import { CompanyModel } from './company.model';

export interface CompanyMemberModel {
  id: number;
  department: string;
  userEmail: string;
  position: string;
  companyId: number;
}

export interface CompanyMemberContentModel {
  data: CompanyMemberModel;
  include: {
    user: UserModel;
    company: CompanyModel;
  };
}
