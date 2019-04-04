import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '@app/shared/model/pageable.model';
import { ApiResponse } from './api.service';
import { CacheService } from './cache.service';
import { CompanyPipelineContentModel } from '@app/shared/model/company-pipeline.model';

@Injectable({ providedIn: 'root' })
export class CompanyPipelineService {

  constructor(private cacheService: CacheService) { }

  getList(): Observable<ApiResponse<Pageable<CompanyPipelineContentModel>>> {
    return this.cacheService.getDataOnce<Pageable<CompanyPipelineContentModel>>('company-pipeline');
  }
}
