import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { InvoiceModel } from "@app/shared/model/invoice.model";

@Injectable({ providedIn: 'root' })
export class UserPlanService {

  constructor(private api: ApiService) { }

  getUserPlan(planId: number): Observable<ApiResponse<InvoiceModel>> {
    return this.api.get<InvoiceModel>(`user-plan/${planId}`);
  }

  saveUserPlan(planId: number): Observable<ApiResponse<InvoiceModel>> {
    return this.api.post<InvoiceModel>(`user-plan/${planId}`);
  }
}
