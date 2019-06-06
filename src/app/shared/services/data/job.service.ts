import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { JobModel, JobContentModel } from "@app/shared/model/job.model";
import { JobStatus } from '@app/shared/model/enumeration/job-status';

export interface JobListRequest {
  search?: string;
  status?: JobStatus;
  hireTeam?: boolean;
  manager?: number;
  company?: number; // company id
  page?: number;
  size?: number; // size of page
  // Sorting criteria in the format: property(,asc|desc). Sorting criteria in the format: property(,asc|desc)
  sort?: string;
}

@Injectable({ providedIn: 'root' })
export class JobService {

  private storedObject: JobContentModel;

  constructor(private api: ApiService) { }

  create(model: JobModel): Observable<ApiResponse<JobContentModel>> {
    return this.api.post<JobContentModel>('job', model);
  }

  getList(params?: JobListRequest): Observable<ApiResponse<Pageable<JobContentModel>>> {
    return this.api.get<Pageable<JobContentModel>>('job', params as any);
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
      return this.api.get<JobContentModel>(`job/${id}`)
        .pipe(tap(r => {
          if (r.success)
            this.storedObject = r.data;
        }));
    }
  }

  store(model: JobContentModel): void {
    this.storedObject = model;
  }
}
