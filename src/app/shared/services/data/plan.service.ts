import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { PlanModel } from '@app/shared/model/plan.model';

@Injectable({ providedIn: 'root' })
export class PlanService {

  constructor(private api: ApiService) { }

  getList(): Observable<ApiResponse<Pageable<PlanModel>>> {
    return this.api.get<Pageable<PlanModel>>('plan');
  }
}
