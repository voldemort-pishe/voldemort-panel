import { UserModel } from './user.model';
import { ContactModel } from './company-contact.model';

export interface CompanyModel {
  id: number;
  userId: number;
  createdDate: Date;
  nameEn: string;
  nameFa: string;
  descriptionEn: string;
  descriptionFa: string;
  language: string;
  subDomain: string;
  fileId: number;
  contact: ContactModel;
}

export interface CompanyContentModel {
  data: CompanyModel;
  include: {
    file: File;
    user: UserModel;
  };
}
