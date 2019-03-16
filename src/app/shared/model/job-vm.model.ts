import { Pageable } from "@app/shared/model/pageable.model";
import { CompanyModel } from "@app/shared/model/company.model";
import { File } from "@app/shared/model/file.model";
import { UserModel } from "@app/shared/model/user.model";
import { JobModel } from "@app/shared/model/job.model";

export interface JobIncludeModel {
  hiredManager: File;
  hiredExpert: UserModel;
  company: CompanyModel;
}

export interface JobContentModel {
  data: JobModel;
  include: JobIncludeModel;
}

export class JobVm implements Pageable {

  constructor(public content: JobContentModel[],
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
