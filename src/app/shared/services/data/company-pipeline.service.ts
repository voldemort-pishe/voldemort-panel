import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '@app/shared/model/pageable.model';
import { ApiResponse, ApiService } from '../api.service';
import { CacheService } from '../cache.service';
import { CompanyPipelineContentModel, CompanyPipelineModel } from '@app/shared/model/company-pipeline.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CompanyPipelineService {

  constructor(
    private api: ApiService,
    private cache: CacheService,
  ) { }

  getList(): Observable<ApiResponse<Pageable<CompanyPipelineContentModel>>> {
    return this.cache.getDataOnce<Pageable<CompanyPipelineContentModel>>('company-pipeline');
  }

  getDetail(id: number): Observable<ApiResponse<CompanyPipelineContentModel>> {
    return this.api.get<CompanyPipelineContentModel>(`company-pipeline/${id}`);
  }

  create(data: CompanyPipelineModel): Observable<ApiResponse<CompanyPipelineContentModel>> {
    return this.api.post<CompanyPipelineContentModel>('company-pipeline', data)
      .pipe(tap(r => this.invalidateCache(r)));
  }

  edit(data: CompanyPipelineModel): Observable<ApiResponse<CompanyPipelineContentModel>> {
    return this.api.put<CompanyPipelineContentModel>('company-pipeline', data)
      .pipe(tap(r => this.invalidateCache(r)));
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.api.delete<void>(`company-pipeline/${id}`)
      .pipe(tap(r => this.invalidateCache(r)));
  }

  private invalidateCache(result: ApiResponse<any>): void {
    if (result.success)
      this.cache.invalidateData('company-pipeline');
  }
}
