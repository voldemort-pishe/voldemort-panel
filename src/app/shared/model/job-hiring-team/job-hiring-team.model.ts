import { Moment } from 'moment';

export class JobHireTeamModel {
  id?: number;
  jobId?: number;
  role?: string;
  userId?: number;
  createdDate?: Moment;
}
