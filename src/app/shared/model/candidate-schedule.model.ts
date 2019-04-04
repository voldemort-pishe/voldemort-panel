import { CandidateScheduleMemberModel } from './candidate-schedule-member.model';
import { ScheduleStatus } from "@app/shared/model/enumeration/schedule-status.model";
import { CandidateModel } from './candidate.model';

export interface CandidateScheduleModel {
  id?: number;
  candidateId?: number;
  description?: string;
  status?: ScheduleStatus;
  location?: string;
  startDate?: string;
  endDate?: string;
  member?: CandidateScheduleMemberModel[];
}

export interface CandidateScheduleContentModel {
  data: CandidateScheduleModel;
  include: {
    candidate: CandidateModel;
  };
}
