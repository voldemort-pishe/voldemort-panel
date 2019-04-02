import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventContentModel } from "@app/shared/model/event.model";
import { ApiService, ApiResponse } from './api.service';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';
import { EventType } from '@app/shared/model/enumeration/event-type.model';
import { EventCountModel } from '@app/shared/model/event-count.model';

@Injectable({ providedIn: 'root' })
export class EventService {

  constructor(private apiService: ApiService) { }

  getList(status?: EventStatus, type?: EventType, flag?: boolean, ownerId?: number): Observable<ApiResponse<EventContentModel[]>> {
    const req = {};
    if (status != null) req['status'] = status;
    if (type != null) req['type'] = type;
    if (flag != null) req['flag'] = String(flag);
    if (ownerId != null) req['ownerId'] = ownerId.toString();
    return this.apiService.get<EventContentModel[]>('event', req);
  }

  getListCount(status: EventStatus): Observable<ApiResponse<EventCountModel>> {
    return this.apiService.get<EventCountModel>('event/count', { status: status });
  }
}
