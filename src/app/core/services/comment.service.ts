import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { CommentModel, CommentContentModel } from "@app/shared/model/comment.model";
import { ApiService, ApiResponse } from './api.service';
import { Pageable } from '@app/shared/model/pageable.model';

type EntityResponseType = HttpResponse<CommentContentModel>;
type EntityArrayResponseType = HttpResponse<Pageable<CommentContentModel>>;

@Injectable({ providedIn: 'root' })
export class CommentService {

  private resourceUrl = env.serverApiUrl + 'comment';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  create1(comment: CommentModel): Observable<EntityResponseType> {
    return this.http.post<CommentContentModel>(`${this.resourceUrl}`, comment, { observe: 'response' });
  }

  getCandidateComment(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<CommentContentModel>>(`${this.resourceUrl}/candidate/${id}`, { observe: 'response' });
  }

  getListByCandidate(candidateId: number): Observable<ApiResponse<Pageable<CommentContentModel>>> {
    return this.apiService.get<Pageable<CommentContentModel>>(`comment/candidate/${candidateId}`);
  }

  create(comment: CommentModel): Observable<ApiResponse<CommentContentModel>> {
    return this.apiService.post<CommentContentModel>('comment', comment);
  }
}
