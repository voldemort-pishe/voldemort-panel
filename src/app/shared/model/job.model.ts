import { FileModel } from './file.model';
import { UserModel } from './user.model';
import { CompanyModel } from './company.model';
import { LanguageType } from './enumeration/language-type';
import { JobType } from './enumeration/job-type';
import { JobStatus } from './enumeration/job-status';

export interface JobModel {
  id?: number;
  uniqueId?: string;
  nameFa?: string;
  descriptionFa?: string;
  nameEn?: string;
  descriptionEn?: string;
  language?: LanguageType;
  type?: JobType;
  location?: string;
  department?: string;
  hiredManagerId?: number;
  hiredExpertId?: number;
  companyId?: number;
  status?: JobStatus;
}

export interface JobContentModel {
  data: JobModel;
  include: {
    hiredManager: FileModel;
    hiredExpert: UserModel;
    company: CompanyModel;
  };
}