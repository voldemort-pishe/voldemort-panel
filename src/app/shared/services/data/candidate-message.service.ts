import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { CandidateMessageModel, CandidateMessageContentModel } from "@app/shared/model/candidate-message.model";

@Injectable({ providedIn: 'root' })
export class CandidateMessageService {

  constructor(private api: ApiService) { }

  create(candidateMessage: CandidateMessageModel): Observable<ApiResponse<CandidateMessageContentModel>> {
    return this.api.post<CandidateMessageContentModel>('candidate-message/create-specific', candidateMessage);
  }

  getListByCandidate(candidateId: number): Observable<ApiResponse<Pageable<CandidateMessageContentModel>>> {
    const params = { sort: 'createdDate,desc' };
    return this.api.get<Pageable<CandidateMessageContentModel>>(`candidate-message/candidate/${candidateId}`, params);
  }
}
