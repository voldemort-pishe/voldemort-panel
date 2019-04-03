import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { CommentContentModel } from "@app/shared/model/comment-vm.model";
import { CommentModel } from "@app/shared/model/comment.model";
import { CommentPage } from "@app/shared/model/comment-page.mode";
import { ApiService, ApiResponse } from './api.service';
import { PageableGeneric } from '@app/shared/model/pageable.model';

type EntityResponseType = HttpResponse<CommentContentModel>;
type EntityArrayResponseType = HttpResponse<CommentPage>;

@Injectable({ providedIn: 'root' })
export class CommentService {

  private resourceUrl = env.serverApiUrl + 'comment';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  create1(comment: CommentModel): Observable<EntityResponseType> {
    return this.http.post<CommentContentModel>(`${this.resourceUrl}`, comment, { observe: 'response' });
  }

  getCandidateComment(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<CommentPage>(`${this.resourceUrl}/candidate/${id}`, { observe: 'response' });
  }

  getListByCandidate(candidateId: number): Observable<ApiResponse<PageableGeneric<CommentContentModel>>> {
    return this.apiService.get<PageableGeneric<CommentContentModel>>(`comment/candidate/${candidateId}`);
  }

  create(comment: CommentModel): Observable<ApiResponse<CommentContentModel>> {
    return this.apiService.post<CommentContentModel>('comment', comment);
  }
}
