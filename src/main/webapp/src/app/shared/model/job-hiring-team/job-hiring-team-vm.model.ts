import {User} from "@app/shared/model/user.model";
import {Job} from "@app/shared/model/job.model";
import {JobHiringTeam} from "@app/shared/model/job-hiring-team/job-hiring-team.model";

export class Include {
  user: User;
  job: Job;
}
export class JobHiringTeamVm {
  data: JobHiringTeam;
  include: Include;
}
