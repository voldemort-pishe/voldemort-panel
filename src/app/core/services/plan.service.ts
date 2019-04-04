import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { PlanModel } from '@app/shared/model/plan.model';
import { Pageable } from '@app/shared/model/pageable.model';

type EntityArrayResponseType = HttpResponse<Pageable<PlanModel>>;

@Injectable({ providedIn: 'root' })
export class PlanService {

  private resourceUrl = env.serverApiUrl + 'plan';

  constructor(private http: HttpClient) { }

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<PlanModel>>(`${this.resourceUrl}`, { observe: 'response' });
  }


}
