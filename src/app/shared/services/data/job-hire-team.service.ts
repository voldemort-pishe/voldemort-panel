import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { JobHireTeamModel, JobHireTeamContentModel } from '@app/shared/model/job-hiring-team.model';

@Injectable({ providedIn: 'root' })
export class JobHireTeamService {

  constructor(private api: ApiService) { }

  create(jobId: number, members: JobHireTeamModel[]): Observable<ApiResponse<JobHireTeamContentModel[]>> {
    const req = { jobId: jobId, teams: members };
    return this.api.post<JobHireTeamContentModel[]>('job-hire-team', req);
  }

  getListByJobId(jobId: number): Observable<ApiResponse<JobHireTeamContentModel[]>> {
    return this.api.get(`job-hire-team/job/${jobId}`);
  }
}