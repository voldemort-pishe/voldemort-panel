import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyPipelineContentModel } from "@app/shared/model/company-pipeline-vm.model";
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { ApiResponse } from './api.service';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class CompanyPipelineService {

  constructor(private cacheService: CacheService) { }

  getList(): Observable<ApiResponse<PageableGeneric<CompanyPipelineContentModel>>> {
    return this.cacheService.getDataOnce<PageableGeneric<CompanyPipelineContentModel>>('company-pipeline');
  }
}
