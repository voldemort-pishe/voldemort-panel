import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from './api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { CompanyMemberContentModel } from '@app/shared/model/company-member.model';

@Injectable({ providedIn: 'root' })
export class CompanyMemberService {

  constructor(private apiService: ApiService) { }

  getList(email?: string): Observable<ApiResponse<Pageable<CompanyMemberContentModel>>> {
    const req = {};
    if (email) req['email'] = email;
    return this.apiService.get<Pageable<CompanyMemberContentModel>>('company-member', req);
  }

  getListActive(): Observable<ApiResponse<Pageable<CompanyMemberContentModel>>> {
    return this.apiService.get<Pageable<CompanyMemberContentModel>>('company-member/active');
  }
}
