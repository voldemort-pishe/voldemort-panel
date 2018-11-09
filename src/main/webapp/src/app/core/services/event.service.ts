import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {Event} from "@app/shared/model/event.model";


type EntityArrayResponseType = HttpResponse<Event[]>;

@Injectable({ providedIn: 'root' })
export class EventService {

  private resourceUrl = env.serverApiUrl + 'api/event';

  constructor(private http: HttpClient) {}

  loadAllByOwner(): Observable<EntityArrayResponseType> {
    return this.http.get<Event[]>(`${this.resourceUrl}`, { observe: 'response' });
  }


}
