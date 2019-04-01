import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventContentModel } from "@app/shared/model/event.model";
import { ApiService, ApiResponse } from './api.service';

@Injectable({ providedIn: 'root' })
export class EventService {

  constructor(private apiService: ApiService) { }

  getList(filters?: { [filter: string]: string }): Observable<ApiResponse<EventContentModel[]>> {
    return this.apiService.get<EventContentModel[]>('event', filters);
  }
}
