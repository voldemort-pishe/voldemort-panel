import { CandidateState } from "@app/shared/model/enumeration/candidate-state.model";
import { CandidateType } from "@app/shared/model/enumeration/candidate-type.model";
import { JobModel } from "@app/shared/model/job.model";
import { CompanyPipelineModel } from "@app/shared/model/company-pipeline.model";
import { FileModel } from "@app/shared/model/file.model";

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

export interface CandidateContentModel {
  data: CandidateModel;
  include: {
    pipeline: CompanyPipelineModel;
    job: JobModel;
    file: FileModel;
  };
}

