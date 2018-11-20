import {Pageable} from "@app/shared/model/pageable.model";
import {Company} from "@app/shared/model/company.model";
import {File} from "@app/shared/model/file.model";
import {User} from "@app/shared/model/user.model";
import {Job} from "@app/shared/model/job.model";

export class Include {
  hiredManager: File;
  hiredExpert: User;
  company: Company;
}

export class ContentJob {
  data:Job;
  include:Include;
}

export class JobVm  implements Pageable {

  constructor(public content: ContentJob[],
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
