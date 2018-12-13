import {CandidateSchedule} from './candidate-schedule.model';
import {ICandidate} from './../candidate.model';

export class Include {
  candidate: ICandidate
}
export class CandidateScheduleVm {
  data: CandidateSchedule;
  include: Include;
}
