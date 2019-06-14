import { UserModel } from './user.model';
import { JobModel } from './job.model';

export interface JobHireTeamModel {
  id?: number;
  jobId?: number;
  role?: string;
  userId?: number;
  createdDate?: string;
}

export interface JobHireTeamContentModel {
  data: JobHireTeamModel;
  include?: {
    user: UserModel;
    job: JobModel;
  };
}
