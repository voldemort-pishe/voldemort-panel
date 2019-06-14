import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { CandidateModel, CandidateContentModel } from "@app/shared/model/candidate.model";
import { CandidateState } from '@app/shared/model/enumeration/candidate-state';
import { CandidateType } from '@app/shared/model/enumeration/candidate-type';

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
  sort?: string;
}

@Injectable({ providedIn: 'root' })
export class CandidateService {

  constructor(private api: ApiService) { }

  getList(params?: CandidateListRequest): Observable<ApiResponse<Pageable<CandidateContentModel>>> {
    return this.api.get<Pageable<CandidateContentModel>>('candidate', params as any);
  }

  getDetail(candidateId: number): Observable<ApiResponse<CandidateContentModel>> {
    return this.api.get<CandidateContentModel>(`candidate/${candidateId}`);
  }

  create(candidate: CandidateModel): Observable<ApiResponse<CandidateContentModel>> {
    return this.api.post<CandidateContentModel>('candidate', candidate);
  }

  update(candidate: CandidateModel): Observable<ApiResponse<CandidateContentModel>> {
    return this.api.put<CandidateContentModel>('candidate', candidate);
  }

  updateState(id: number, state: CandidateState, pipeline?: number): Observable<ApiResponse<CandidateContentModel>> {
    const data = { state: state, pipeline: pipeline };
    return this.api.put<CandidateContentModel>(`candidate/${id}/state`, data);
  }
}
