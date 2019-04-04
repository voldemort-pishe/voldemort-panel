import { LanguageType } from "@app/shared/model/enumeration/language-type.model";
import { JobType } from "@app/shared/model/enumeration/job-type.model";
import { JobStatus } from "@app/shared/model/enumeration/job-status.model";
import { FileModel } from './file.model';
import { UserModel } from './user.model';
import { CompanyModel } from './company.model';

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