import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { CandidateMessageContentModel } from "@app/shared/model/candidate-message-vm.model";
import { CandidateMessageModel } from "@app/shared/model/candidate-message.model";
import { PageCandidateMessageVm } from "@app/shared/model/page-candidate-message-vm.model";
import { ApiService, ApiResponse } from './api.service';
import { PageableGeneric } from '@app/shared/model/pageable.model';

type EntityResponseType = HttpResponse<CandidateMessageContentModel>;
type EntityArrayResponseType = HttpResponse<PageCandidateMessageVm>;

@Injectable({ providedIn: 'root' })
export class CandidateMessageService {

  private resourceUrl = env.serverApiUrl + 'candidate-message';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  create(candidateMessage: CandidateMessageModel): Observable<EntityResponseType> {
    return this.http.post<CandidateMessageContentModel>(`${this.resourceUrl}/create-specific`, candidateMessage, { observe: 'response' });
  }

  getAllCandidateMessage(candidateId: number, sort?: string): Observable<EntityArrayResponseType> {
    return this.http.get<PageCandidateMessageVm>(`${this.resourceUrl}/candidate/${candidateId}?sort=${sort}`, { observe: 'response' });
  }

  getListByCandidate(candidateId: number): Observable<ApiResponse<PageableGeneric<CandidateMessageContentModel>>> {
    const params = { sort: 'createdDate,desc' };
    return this.apiService.get<PageableGeneric<CandidateMessageContentModel>>(`candidate-message/candidate/${candidateId}`, params);
  }
}
