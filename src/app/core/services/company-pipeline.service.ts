import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { CompanyPipelineVm, CompanyPipelineContentModel } from "@app/shared/model/company-pipeline-vm.model";
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { ApiResponse } from './api.service';
import { CacheService } from './cache.service';

type EntityArrayResponseType = HttpResponse<CompanyPipelineVm>;

@Injectable({ providedIn: 'root' })
export class CompanyPipelineService {

  private resourceUrl = env.serverApiUrl + 'company-pipeline';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<CompanyPipelineVm>(`${this.resourceUrl}`, { observe: 'response' });
  }

  getList(): Observable<ApiResponse<PageableGeneric<CompanyPipelineContentModel>>> {
    return this.cacheService.getDataOnce<PageableGeneric<CompanyPipelineContentModel>>('company-pipeline');
  }
}
