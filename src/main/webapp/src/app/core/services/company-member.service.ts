import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {CompanyMemberPage} from "@app/shared/model/company-member/company-member-page.model";

type EntityArrayResponseType = HttpResponse<CompanyMemberPage>;

@Injectable({ providedIn: 'root' })
export class CompanyMemberService {

  private resourceUrl = env.serverApiUrl + 'company-member';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<CompanyMemberPage>(`${this.resourceUrl}`, { observe: 'response' });
  }

  getAllActive(): Observable<EntityArrayResponseType> {
    return this.http.get<CompanyMemberPage>(`${this.resourceUrl}/active`, { observe: 'response' });
  }


}
