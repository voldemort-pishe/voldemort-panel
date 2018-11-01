import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {Plan} from "@app/shared/model/plan.model";

type EntityArrayResponseType = HttpResponse<Plan>;

@Injectable({ providedIn: 'root' })
export class PlanService {

  private resourceUrl = env.serverApiUrl + 'api/plan';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Plan>(`${this.resourceUrl}`, { observe: 'response' });
  }


}
