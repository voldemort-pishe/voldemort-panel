import {UserModel} from "@app/shared/model/user.model";
import {JobModel} from "@app/shared/model/job.model";
import {JobHiringTeam} from "@app/shared/model/job-hiring-team/job-hiring-team.model";

export class Include {
  user: UserModel;
  job: JobModel;
}
export class JobHiringTeamVm {
  data: JobHiringTeam;
  include: Include;
}
