import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {InvoiceModel} from "@app/shared/model/invoice.model";

type EntityArrayResponseType = HttpResponse<InvoiceModel>;

@Injectable({ providedIn: 'root' })
export class UserPlanService {

  private resourceUrl = env.serverApiUrl + 'user-plan';

  constructor(private http: HttpClient) {}

  saveUserPlan(planId: number): Observable<EntityArrayResponseType> {
    return this.http.post<InvoiceModel>(`${this.resourceUrl}/${planId}`,null, { observe: 'response' });
  }

  getUserPlan(planId: number): Observable<EntityArrayResponseType> {
    return this.http.get<InvoiceModel>(`${this.resourceUrl}/${planId}`, { observe: 'response' });
  }

}
