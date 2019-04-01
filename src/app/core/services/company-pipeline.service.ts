import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { CompanyPipelineVm, CompanyPipelineContentModel } from "@app/shared/model/company-pipeline-vm.model";
import { JobContentModel } from '@app/shared/model/job-content.model';
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { ApiService, ApiResponse } from './api.service';

type EntityArrayResponseType = HttpResponse<CompanyPipelineVm>;

@Injectable({ providedIn: 'root' })
export class CompanyPipelineService {

  private resourceUrl = env.serverApiUrl + 'company-pipeline';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<CompanyPipelineVm>(`${this.resourceUrl}`, { observe: 'response' });
  }

  getList(): Observable<ApiResponse<PageableGeneric<CompanyPipelineContentModel>>> {
    return this.apiService.get<PageableGeneric<CompanyPipelineContentModel>>('company-pipeline');
  }
}
