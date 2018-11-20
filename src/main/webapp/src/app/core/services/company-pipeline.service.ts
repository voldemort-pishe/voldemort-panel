import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {CompanyPipelineVm} from "@app/shared/model/company-pipeline-vm.model";

type EntityArrayResponseType = HttpResponse<CompanyPipelineVm>;

@Injectable({ providedIn: 'root' })
export class CompanyPipelineService {

  private resourceUrl = env.serverApiUrl + 'api/company-pipeline';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<CompanyPipelineVm>(`${this.resourceUrl}`, { observe: 'response' });
  }


}
