import {LanguageType} from "@app/shared/model/enumeration/language-type.model";
import {JobType} from "@app/shared/model/enumeration/job-type.model";

export class Job{
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
}
