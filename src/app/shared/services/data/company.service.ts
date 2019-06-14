import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { CompanyModel, CompanyContentModel } from '@app/shared/model/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {

  constructor(private api: ApiService) { }

  get(): Observable<ApiResponse<CompanyContentModel>> {
    return this.api.get<CompanyContentModel>('company');
  }

  update(data: CompanyModel): Observable<ApiResponse<CompanyContentModel>> {
    return this.api.put<CompanyContentModel>(`company/${data.id}`, data);
  }
}
