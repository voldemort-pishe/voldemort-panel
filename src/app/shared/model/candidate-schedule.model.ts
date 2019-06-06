import { CandidateScheduleMemberModel } from './candidate-schedule-member.model';
import { CandidateModel } from './candidate.model';
import { UserModel } from './user.model';
import { ScheduleStatus } from './enumeration/schedule-status';

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
    memberUsers: UserModel[];
  };
}
