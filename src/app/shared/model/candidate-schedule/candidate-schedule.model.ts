import { CandidateScheduleMemberModel } from './candidate-schedule-member.model';
import { ScheduleStatus } from "@app/shared/model/enumeration/schedule-status.model";

export class CandidateScheduleModel {
  id: number;
  candidateId: number;
  description: string;
  status: ScheduleStatus;
  location: string;
  startDate: string;
  endDate: string;
  member: CandidateScheduleMemberModel[];
}
