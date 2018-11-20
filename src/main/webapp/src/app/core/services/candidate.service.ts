import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {Candidate} from "@app/shared/model/candidate.model";

type EntityArrayResponseType = HttpResponse<Candidate>;

@Injectable({ providedIn: 'root' })
export class CandidateService {

  private resourceUrl = env.serverApiUrl + 'api/candidate';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}`, { observe: 'response' });
  }

  search(param: string): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}?${param}`, { observe: 'response' });
  }


}
