import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {JobVm} from "@app/shared/model/job-vm.model";

type EntityArrayResponseType = HttpResponse<JobVm>;

@Injectable({ providedIn: 'root' })
export class JobService {

  private resourceUrl = env.serverApiUrl + 'job';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<JobVm>(`${this.resourceUrl}`, { observe: 'response' });
  }


}
