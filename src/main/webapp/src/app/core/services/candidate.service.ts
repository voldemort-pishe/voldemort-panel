import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { Candidate, CandidateContentModel, CandidateModel } from "@app/shared/model/candidate.model";
import { ApiService, Response } from './api.service';
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state.model';
import { CandidateType } from '@app/shared/model/enumeration/candidate-type.model';

type EntityArrayResponseType = HttpResponse<Candidate>;
type EntityResponseType = HttpResponse<CandidateContentModel>;

export interface CandidateListRequest {
  state?: CandidateState;
  pipeline?: number; // pipeline id
  type?: CandidateType;
  job?: number; // job id
  company?: number; // company id
  search?: string;
  page?: number;
  size?: number; // size of page
  // Sorting criteria in the format: property(,asc|desc). Sorting criteria in the format: property(,asc|desc)
  sort?: string[];
}

@Injectable({ providedIn: 'root' })
export class CandidateService {

  private resourceUrl = env.serverApiUrl + 'candidate';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  create(candidate: CandidateModel): Observable<EntityArrayResponseType> {
    return this.http.post<Candidate>(`${this.resourceUrl}`, candidate, { observe: 'response' });
  }

  get(candidateId: number): Observable<EntityResponseType> {
    return this.http.get<CandidateContentModel>(`${this.resourceUrl}/${candidateId}`, { observe: 'response' });
  }

  update(candidate: CandidateModel): Observable<EntityResponseType> {
    return this.http.put<CandidateContentModel>(`${this.resourceUrl}`, candidate, { observe: 'response' });
  }

  loadAll(sort?: string, page?: number, size?: number): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}?sort=${sort}&page=${page}&size=${size}`, { observe: 'response' });
  }

  search(param: string, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<Candidate>(`${this.resourceUrl}?${param}&sort=${sort}`, { observe: 'response' });
  }

  getList(params?: CandidateListRequest): Observable<Response<PageableGeneric<CandidateContentModel>>> {
    return this.apiService.get<PageableGeneric<CandidateContentModel>>('candidate', params as any);
  }
}
