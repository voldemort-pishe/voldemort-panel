import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from '@env/environment';
import { JobModel, JobContentModel } from "@app/shared/model/job.model";
import { ApiService, ApiResponse } from './api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { tap } from 'rxjs/operators';

type EntityArrayResponseType = HttpResponse<Pageable<JobContentModel>>;


@Injectable({ providedIn: 'root' })
export class JobService {

  private resourceUrl = env.serverApiUrl + 'job';

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) { }

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<JobContentModel>>(`${this.resourceUrl}`, { observe: 'response' });
  }

  loadAllPageable(sort?: string, page?: number, size?: number): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<JobContentModel>>(`${this.resourceUrl}?sort=${sort}&page=${page}&size=${size}`, { observe: 'response' });
  }

  search(param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<JobContentModel>>(`${this.resourceUrl}?${param}&sort=${sort}`, { observe: 'response' });
  }

  searchByMultiField(status: string, param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<JobContentModel>>(`${this.resourceUrl}?${status}&${param}&sort=${sort}`, { observe: 'response' });
  }

  getList(): Observable<ApiResponse<Pageable<JobContentModel>>> {
    return this.apiService.get<Pageable<JobContentModel>>('job');
  }

  create(model: JobModel): Observable<ApiResponse<JobContentModel>> {
    return this.apiService.post<JobContentModel>('job', model);
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
