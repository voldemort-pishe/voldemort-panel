import { UserModel } from './user.model';

export interface CompanyModel {
  nameEn: string;
  nameFa: string;
  descriptionEn: string;
  descriptionFa: string;
  language: string;
  subDomain: string;
  fileId: number;
}

export interface CompanyContentModel {
  data: CompanyModel;
  include: {
    file: File;
    user: UserModel;
  };
}
