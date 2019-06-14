import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { CompanyMemberContentModel, CompanyMemberModel } from '@app/shared/model/company-member.model';

@Injectable({ providedIn: 'root' })
export class CompanyMemberService {

  constructor(private api: ApiService) { }

  getList(email?: string): Observable<ApiResponse<Pageable<CompanyMemberContentModel>>> {
    const req = {};
    if (email) req['email'] = email;
    return this.api.get<Pageable<CompanyMemberContentModel>>('company-member', req);
  }

  getListActive(): Observable<ApiResponse<Pageable<CompanyMemberContentModel>>> {
    return this.api.get<Pageable<CompanyMemberContentModel>>('company-member/active');
  }

  createList(members: CompanyMemberModel[]): Observable<ApiResponse<CompanyMemberContentModel[]>> {
    const data = { members: members };
    return this.api.post<CompanyMemberContentModel[]>('company-member/all', data);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.api.delete<void>(`company-member/${id}`);
  }
}
