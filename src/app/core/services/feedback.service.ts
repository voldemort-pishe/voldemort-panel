import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from './api.service';
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { FeedbackContentModel, FeedbackModel } from '@app/shared/model/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {

    constructor(private apiService: ApiService) { }

    getListByCandidate(candidateId: number): Observable<ApiResponse<PageableGeneric<FeedbackContentModel>>> {
        return this.apiService.get<PageableGeneric<FeedbackContentModel>>(`feedback/candidate/${candidateId}`);
    }

    create(feedback: FeedbackModel): Observable<ApiResponse<FeedbackContentModel>> {
        return this.apiService.post<FeedbackContentModel>('feedback', feedback);
    }
}
