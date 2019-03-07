import { UserModel } from "@app/shared/model/user.model";
import { JobModel } from "@app/shared/model/job.model";
import { JobHireTeamModel } from "@app/shared/model/job-hiring-team/job-hiring-team.model";

export interface JobHireTeamIncludeModel {
  user: UserModel;
  job: JobModel;
}
export interface JobHireTeamContentModel {
  data: JobHireTeamModel;
  include: JobHireTeamIncludeModel;
}
