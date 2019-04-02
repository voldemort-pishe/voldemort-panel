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

  getList(filters?: { status?: EventStatus; type?: EventType; flag?: string; ownerId?: string; }): Observable<ApiResponse<EventContentModel[]>> {
    return this.apiService.get<EventContentModel[]>('event', filters);
  }

  getListCount(status: EventStatus): Observable<ApiResponse<EventCountModel>> {
    return this.apiService.get<EventCountModel>('event/count', { status: status });
  }
}
