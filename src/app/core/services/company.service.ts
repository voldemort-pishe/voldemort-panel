import { Injectable } from '@angular/core';
import { ApiService, Response } from './api.service';
import { CompanyContentModel } from '@app/shared/model/company-vm.model';
import { Observable } from 'rxjs';
import { CompanyModel } from '@app/shared/model/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {

  constructor(private apiService: ApiService) { }

  get(): Observable<Response<CompanyContentModel>> {
    return this.apiService.get<CompanyContentModel>('company');
  }

  update(data: CompanyModel): Observable<Response<CompanyContentModel>> {
    return this.apiService.put<CompanyContentModel>('company', data);
  }
}
