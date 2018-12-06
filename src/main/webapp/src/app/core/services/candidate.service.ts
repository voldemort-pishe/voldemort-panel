import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {Candidate, ContentCandidate, ICandidate} from "@app/shared/model/candidate.model";

type EntityArrayResponseType = HttpResponse<Candidate>;
type EntityResponseType = HttpResponse<ContentCandidate>;

@Injectable({ providedIn: 'root' })
export class CandidateService {

  private resourceUrl = env.serverApiUrl + 'candidate';

  constructor(private http: HttpClient) {}

  create(candidate: ICandidate): Observable<EntityArrayResponseType> {
    return this.http.post<Candidate>(`${this.resourceUrl}`, candidate, { observe: 'response' });
  }

  get(candidateId: number): Observable<EntityResponseType> {
    return this.http.get<ContentCandidate>(`${this.resourceUrl}/${candidateId}`, { observe: 'response' });
  }

  update(candidate: ICandidate): Observable<EntityResponseType> {
    return this.http.put<ContentCandidate>(`${this.resourceUrl}`, candidate, { observe: 'response' });
  }

  loadAll(sort?: string, page?: number, size?: number): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}?sort=${sort}&page=${page}&size=${size}`, { observe: 'response' });
  }

  search(param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}?${param}&sort=${sort}`, { observe: 'response' });
  }


}
