import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {CompanyVm} from "@app/shared/model/company-vm.model";

type EntityArrayResponseType = HttpResponse<CompanyVm>;

@Injectable({ providedIn: 'root' })
export class CompanyService {

  private resourceUrl = env.serverApiUrl + 'api/company';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<CompanyVm>(`${this.resourceUrl}`, { observe: 'response' });
  }


}
