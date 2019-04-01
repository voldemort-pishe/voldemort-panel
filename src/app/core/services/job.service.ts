import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment as env } from '@env/environment';
import { JobVm, JobContentModel } from "@app/shared/model/job-vm.model";
import { Candidate, CandidateModel } from "@app/shared/model/candidate.model";
import { JobModel } from "@app/shared/model/job.model";
import { ApiService, ApiResponse } from './api.service';
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { tap } from 'rxjs/operators';

type EntityArrayResponseType = HttpResponse<JobVm>;
type EntityResponseType = HttpResponse<JobContentModel>;


@Injectable({ providedIn: 'root' })
export class JobService {

  private resourceUrl = env.serverApiUrl + 'job';

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) { }

  create(job: JobModel): Observable<EntityResponseType> {
    return this.http.post<JobContentModel>(`${this.resourceUrl}`, job, { observe: 'response' });
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

  searchByMultiField(status: string, param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<JobVm>(`${this.resourceUrl}?${status}&${param}&sort=${sort}`, { observe: 'response' });
  }

  getList(): Observable<ApiResponse<PageableGeneric<JobContentModel>>> {
    return this.apiService.get<PageableGeneric<JobContentModel>>('job');
  }

  private storedObject: JobContentModel;

  store(model: JobContentModel): void {
    this.storedObject = model;
  }

  getDetail(id: number): Observable<ApiResponse<JobContentModel>> {
    // TODO: share one observable, prevent from sending same request multiple times
    if (this.storedObject && this.storedObject.data.id === id) {
      return of({
        success: true,
        status: 200,
        data: this.storedObject,
      });
    }
    else {
      return this.apiService.get<JobContentModel>(`job/${id}`)
        .pipe(tap(r => {
          if (r.success)
            this.storedObject = r.data;
        }));
    }
  }
}
