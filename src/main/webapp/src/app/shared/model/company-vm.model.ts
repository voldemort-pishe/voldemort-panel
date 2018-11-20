import {Pageable} from "@app/shared/model/pageable.model";
import {Company} from "@app/shared/model/company.model";
import {File} from "@app/shared/model/file.model";
import {User} from "@app/shared/model/user.model";

export class Include {
  file: File;
  user: User;
}

export class ContentCompany {
  data:Company;
  include:Include;
}

export class CompanyVm  implements Pageable {

  constructor(public content: ContentCompany[],
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
