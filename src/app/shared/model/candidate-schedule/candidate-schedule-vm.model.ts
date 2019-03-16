import {CandidateSchedule} from './candidate-schedule.model';
import {CandidateModel} from './../candidate.model';

export class Include {
  candidate: CandidateModel
}
export class CandidateScheduleVm {
  data: CandidateSchedule;
  include: Include;
}
