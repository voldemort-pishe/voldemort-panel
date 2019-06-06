import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { CommentModel, CommentContentModel } from "@app/shared/model/comment.model";

@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(private api: ApiService) { }

  getListByCandidate(candidateId: number): Observable<ApiResponse<Pageable<CommentContentModel>>> {
    return this.api.get<Pageable<CommentContentModel>>(`comment/candidate/${candidateId}`);
  }

  create(comment: CommentModel): Observable<ApiResponse<CommentContentModel>> {
    return this.api.post<CommentContentModel>('comment', comment);
  }
}
