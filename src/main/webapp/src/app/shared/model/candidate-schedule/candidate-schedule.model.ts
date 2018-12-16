import {CandidateScheduleMember} from './candidate-schedule-member.model';
import {Moment} from 'moment';

export class CandidateSchedule {
  candidateId: number;
  description: string;
  endDate: Moment;
  id: number;
  location: string;
  member: CandidateScheduleMember[];
  startDate: Moment;
  status: string;
}
