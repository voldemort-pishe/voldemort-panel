import { CompanyModel } from './company.model';

export interface CompanyPipelineModel {
  id: number;
  title: string;
  weight: number;
  companyId: number;
}

export interface CompanyPipelineContentModel {
  data: CompanyPipelineModel;
  include: {
    company: CompanyModel;
  };
}