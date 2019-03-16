import { CandidateState } from "@app/shared/model/enumeration/candidate-state.model";
import { CandidateType } from "@app/shared/model/enumeration/candidate-type.model";
import { Pageable } from "@app/shared/model/pageable.model";
import { JobModel } from "@app/shared/model/job.model";
import { CompanyPipelineModel } from "@app/shared/model/company-pipeline.model";
import { File } from "@app/shared/model/file.model";

export interface CandidateModel {
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

export interface CandidateIncludeModel {
  pipeline: CompanyPipelineModel;
  job: JobModel;
  candidate: Candidate;
  file: File;
}

export interface CandidateContentModel {
  data: CandidateModel;
  include: CandidateIncludeModel;
}

export class Candidate implements Pageable {

  constructor(public content: CandidateContentModel[],
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
