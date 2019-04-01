import { CandidateScheduleModel } from './candidate-schedule.model';
import { CandidateModel } from './../candidate.model';

export class CandidateScheduleContentModel {
  data: CandidateScheduleModel;
  include: {
    candidate: CandidateModel
  };
}
