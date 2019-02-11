import { LanguageType } from "@app/shared/model/enumeration/language-type.model";
import { JobType } from "@app/shared/model/enumeration/job-type.model";
import { JobStatus } from "@app/shared/model/enumeration/job-status.model";

export interface JobModel {
  id: number;
  uniqueId: string;
  nameFa: string;
  descriptionFa: string;
  nameEn: string;
  descriptionEn: string;
  language: LanguageType;
  type: JobType;
  location: string;
  department: string;
  hiredManagerId: number;
  hiredExpertId: number;
  companyId: number;
  status: JobStatus;
}
