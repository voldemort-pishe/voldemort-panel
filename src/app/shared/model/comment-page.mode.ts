import {Pageable} from "@app/shared/model/pageable.model";
import {CommentVm} from "@app/shared/model/comment-vm.model";

export class CommentPage implements Pageable {

  constructor(public content: CommentVm[],
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
