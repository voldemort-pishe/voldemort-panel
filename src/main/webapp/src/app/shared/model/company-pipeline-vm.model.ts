import {Pageable} from "@app/shared/model/pageable.model";
import {CompanyPipeline} from "@app/shared/model/company-pipeline.model";
import {Company} from "@app/shared/model/company.model";


export class Include {
  company: Company;
}

export class ContentCompanyPipeline {
  data:CompanyPipeline;
  include:Include;
}

export class CompanyPipelineVm  implements Pageable{

  constructor(public content: ContentCompanyPipeline[],
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
