import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {JobHiringTeamPage} from "@app/shared/model/job-hiring-team/job-hiring-team-page.model";

type EntityArrayResponseType = HttpResponse<JobHiringTeamPage>;


@Injectable({ providedIn: 'root' })
export class JobHireTeamService {

  private resourceUrl = env.serverApiUrl + 'job-hire-team';

  constructor(private http: HttpClient) {}

  create(data): Observable<EntityArrayResponseType> {
    return this.http.post<JobHiringTeamPage>(`${this.resourceUrl}`,data, { observe: 'response' });
  }



}
