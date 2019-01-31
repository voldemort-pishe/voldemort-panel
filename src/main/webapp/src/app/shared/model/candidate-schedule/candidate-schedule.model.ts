import {CandidateScheduleMember} from './candidate-schedule-member.model';
import {Moment} from 'jalali-moment';
import {ScheduleStatus} from "@app/shared/model/enumeration/schedule-status.model";

export class CandidateSchedule {
  candidateId: number;
  description: string;
  endDate: Moment;
  id: number;
  location: string;
  member: Array<CandidateScheduleMember>;
  startDate: Moment;
  status: ScheduleStatus;
}
