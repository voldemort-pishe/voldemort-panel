import { Moment as jMoment } from 'jalali-moment';
import {Owner} from "@app/shared/model/owner.model";
import {Candidate} from "@app/shared/model/candidate.model";
import {Pageable} from "@app/shared/model/pageable.model";
import {ScheduleStatus} from "@app/shared/model/enumeration/schedule-status.model";

export class ICandidateSchedule {
  id: number;
  startDate: jMoment;
  endDate: jMoment;
  location: string;
  status: ScheduleStatus;
  description: string;
  candidateId: number;
}

export class Include {
  owner:Owner;
  candidate:Candidate;
}

export class ContentSchedule {
  data:ICandidateSchedule;
  include:Include;
}

export class CandidateSchedule implements Pageable {

  constructor(public content: ContentSchedule[],
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
