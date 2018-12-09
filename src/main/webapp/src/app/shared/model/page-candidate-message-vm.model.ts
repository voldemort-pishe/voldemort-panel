import {Pageable} from "@app/shared/model/pageable.model";
import {CandidateMessageVm} from "@app/shared/model/candidate-message-vm.model";

export class PageCandidateMessageVm implements Pageable {

  constructor(public content: CandidateMessageVm[],
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
