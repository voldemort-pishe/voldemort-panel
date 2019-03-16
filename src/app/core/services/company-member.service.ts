import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyMemberPage } from "@app/shared/model/company-member/company-member-page.model";
import { ApiService, Response } from './api.service';
import { CompanyMemberContentModel } from '@app/shared/model/company-member/company-member-vm.model';
import { PageableGeneric } from '@app/shared/model/pageable.model';

@Injectable({ providedIn: 'root' })
export class CompanyMemberService {

  private resourceUrl = 'company-member';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Response<PageableGeneric<CompanyMemberContentModel>>> {
    return this.apiService.get<CompanyMemberPage>(`${this.resourceUrl}`);
  }

  getAllActive(): Observable<Response<PageableGeneric<CompanyMemberContentModel>>> {
    return this.apiService.get<CompanyMemberPage>(`${this.resourceUrl}/active`);
  }

  searchByEmail(email: string): Observable<Response<PageableGeneric<CompanyMemberContentModel>>> {
    return this.apiService.get<CompanyMemberPage>(`${this.resourceUrl}`, { email });
  }

}