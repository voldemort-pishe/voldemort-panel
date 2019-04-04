import { Injectable } from '@angular/core';
import { ApiService, ApiResponse } from './api.service';
import { Observable } from 'rxjs';
import { CompanyModel, CompanyContentModel } from '@app/shared/model/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {

  constructor(private apiService: ApiService) { }

  get(): Observable<ApiResponse<CompanyContentModel>> {
    return this.apiService.get<CompanyContentModel>('company');
  }

  update(data: CompanyModel): Observable<ApiResponse<CompanyContentModel>> {
    return this.apiService.put<CompanyContentModel>('company', data);
  }
}
