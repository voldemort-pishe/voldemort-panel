import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyMemberPage } from "@app/shared/model/company-member/company-member-page.model";
import { ApiService, ApiResponse } from './api.service';
import { CompanyMemberContentModel } from '@app/shared/model/company-member/company-member-vm.model';
import { PageableGeneric } from '@app/shared/model/pageable.model';

@Injectable({ providedIn: 'root' })
export class CompanyMemberService {

  constructor(private apiService: ApiService) { }

  getList(email?: string): Observable<ApiResponse<PageableGeneric<CompanyMemberContentModel>>> {
    const req = {};
    if (email) req['email'] = email;
    return this.apiService.get<CompanyMemberPage>('company-member', req);
  }

  getListActive(): Observable<ApiResponse<PageableGeneric<CompanyMemberContentModel>>> {
    return this.apiService.get<CompanyMemberPage>('company-member/active');
  }
}
