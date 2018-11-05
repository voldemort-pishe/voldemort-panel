import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {Invoice} from "@app/shared/model/invoice.model";

type EntityArrayResponseType = HttpResponse<Invoice>;

@Injectable({ providedIn: 'root' })
export class UserPlanService {

  private resourceUrl = env.serverApiUrl + 'api/user-plan';

  constructor(private http: HttpClient) {}

  saveUserPlan(planId: number): Observable<EntityArrayResponseType> {
    return this.http.get<Invoice>(`${this.resourceUrl}/${planId}`, { observe: 'response' });
  }


}
