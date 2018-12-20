import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {ContentJob, JobVm} from "@app/shared/model/job-vm.model";
import {Candidate, ICandidate} from "@app/shared/model/candidate.model";
import {Job} from "@app/shared/model/job.model";

type EntityArrayResponseType = HttpResponse<JobVm>;
type EntityResponseType = HttpResponse<ContentJob>;


@Injectable({ providedIn: 'root' })
export class JobService {

  private resourceUrl = env.serverApiUrl + 'job';

  constructor(private http: HttpClient) {}

  create(job: Job): Observable<EntityResponseType> {
    return this.http.post<ContentJob>(`${this.resourceUrl}`, job, { observe: 'response' });
  }

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<JobVm>(`${this.resourceUrl}`, { observe: 'response' });
  }

  loadAllPageable(sort?: string, page?: number, size?: number): Observable<EntityArrayResponseType> {
    return this.http.get<JobVm>(`${this.resourceUrl}?sort=${sort}&page=${page}&size=${size}`, { observe: 'response' });
  }

  search(param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<JobVm>(`${this.resourceUrl}?${param}&sort=${sort}`, { observe: 'response' });
  }

  searchByMultiField(status: string,param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<JobVm>(`${this.resourceUrl}?${status}&${param}&sort=${sort}`, { observe: 'response' });
  }

}
