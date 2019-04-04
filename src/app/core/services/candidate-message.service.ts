import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { CandidateMessageModel, CandidateMessageContentModel } from "@app/shared/model/candidate-message.model";
import { ApiService, ApiResponse } from './api.service';
import { Pageable } from '@app/shared/model/pageable.model';

type EntityResponseType = HttpResponse<CandidateMessageContentModel>;

@Injectable({ providedIn: 'root' })
export class CandidateMessageService {

  private resourceUrl = env.serverApiUrl + 'candidate-message';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  create(candidateMessage: CandidateMessageModel): Observable<EntityResponseType> {
    return this.http.post<CandidateMessageContentModel>(`${this.resourceUrl}/create-specific`, candidateMessage, { observe: 'response' });
  }

  getListByCandidate(candidateId: number): Observable<ApiResponse<Pageable<CandidateMessageContentModel>>> {
    const params = { sort: 'createdDate,desc' };
    return this.apiService.get<Pageable<CandidateMessageContentModel>>(`candidate-message/candidate/${candidateId}`, params);
  }
}
