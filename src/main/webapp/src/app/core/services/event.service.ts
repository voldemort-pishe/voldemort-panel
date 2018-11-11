import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {IEvent} from "@app/shared/model/event.model";


type EntityArrayResponseType = HttpResponse<IEvent[]>;

@Injectable({ providedIn: 'root' })
export class EventService {

  private resourceUrl = env.serverApiUrl + 'api/event';

  constructor(private http: HttpClient) {}

  loadAllByOwner(): Observable<EntityArrayResponseType> {
    return this.http.get<IEvent[]>(`${this.resourceUrl}`, { observe: 'response' });
  }


}
