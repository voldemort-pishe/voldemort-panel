import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { JobHiringTeamPage } from "@app/shared/model/job-hiring-team/job-hiring-team-page.model";
import { ApiService, Response } from './api.service';
import { JobHireTeamContentModel } from '@app/shared/model/job-hiring-team/job-hiring-team-vm.model';

type EntityArrayResponseType = HttpResponse<JobHiringTeamPage>;


@Injectable({ providedIn: 'root' })
export class JobHireTeamService {

  private resourceUrl = env.serverApiUrl + 'job-hire-team';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  create(data): Observable<EntityArrayResponseType> {
    return this.http.post<JobHiringTeamPage>(`${this.resourceUrl}`, data, { observe: 'response' });
  }

  getListByJobId(jobId: number): Observable<Response<JobHireTeamContentModel[]>> {
    return this.apiService.get(`job-hire-team/job/${jobId}`);
  }

}
