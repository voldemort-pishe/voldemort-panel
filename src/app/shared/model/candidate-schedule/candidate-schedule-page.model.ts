import {CandidateScheduleContentModel} from './candidate-schedule-vm.model';
import {Pageable} from "./../pageable.model";

export class CandidateSchedulePage implements Pageable{
  constructor(public content: CandidateScheduleContentModel[],
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
