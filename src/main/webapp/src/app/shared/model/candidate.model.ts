import {CandidateState} from "@app/shared/model/enumeration/candidate-state.model";
import {CandidateType} from "@app/shared/model/enumeration/candidate-type.model";
import {Pageable} from "@app/shared/model/pageable.model";
import {ICandidateSchedule} from "@app/shared/model/candidate-schedule.model";
import {Owner} from "@app/shared/model/owner.model";
import {Job} from "@app/shared/model/job.model";
import {CompanyPipeline} from "@app/shared/model/company-pipeline.model";

export class ICandidate {
  id: number;
  firstName: string;
  lastName: string;
  cellphone: string;
  email: string;
  state: CandidateState;
  type: CandidateType;
  candidatePipeline: number;
  fileId?: number;
  jobId?: number;

}

export class Include {
  pipeline:CompanyPipeline;
  job: Job;
  candidate:Candidate;
}

export class ContentCandidate {
  data:ICandidate;
  include:Include;
}

export class Candidate implements Pageable{

  constructor(public content: ContentCandidate[],
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
