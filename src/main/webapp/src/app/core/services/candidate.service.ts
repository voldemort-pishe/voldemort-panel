import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {Candidate, ContentCandidate, ICandidate} from "@app/shared/model/candidate.model";

type EntityArrayResponseType = HttpResponse<Candidate>;
type EntityUpdateResponseType = HttpResponse<ContentCandidate>;

@Injectable({ providedIn: 'root' })
export class CandidateService {

  private resourceUrl = env.serverApiUrl + 'api/candidate';

  constructor(private http: HttpClient) {}

  create(candidate: ICandidate): Observable<EntityArrayResponseType> {
    return this.http.post<Candidate>(`${this.resourceUrl}`, candidate, { observe: 'response' });
  }

  update(candidate: ICandidate): Observable<EntityUpdateResponseType> {
    return this.http.put<ContentCandidate>(`${this.resourceUrl}`, candidate, { observe: 'response' });
  }

  loadAll(sort?: string, page?: number, size?: number): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}?sort=${sort}&page=${page}&size=${size}`, { observe: 'response' });
  }

  search(param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}?${param}&sort=${sort}`, { observe: 'response' });
  }


}
