import { Pageable } from "@app/shared/model/pageable.model";
import { CompanyPipelineModel } from "@app/shared/model/company-pipeline.model";
import { CompanyModel } from "@app/shared/model/company.model";


export interface CompanyPipelineIncludeModel {
  company: CompanyModel;
}

export interface CompanyPipelineContentModel {
  data: CompanyPipelineModel;
  include: CompanyPipelineIncludeModel;
}

export class CompanyPipelineVm implements Pageable {

  constructor(public content: CompanyPipelineContentModel[],
    public first: boolean,
    public last: boolean,
    public number: number,
    public numberOfElements: number,
    public size: number,
    public sort: any,
    public totalElements: number,
    public totalPages: number) {
    this.content = content;
    this.first = first;
    this.last = last;
    this.number = number;
    this.numberOfElements = numberOfElements;
    this.size = size;
    this.sort = sort;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }

}
