import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {CommentVm} from "@app/shared/model/comment-vm.model";
import {Comment} from "@app/shared/model/comment.model";
import {CommentPage} from "@app/shared/model/comment-page.mode";

type EntityResponseType = HttpResponse<CommentVm>;
type EntityArrayResponseType = HttpResponse<CommentPage>;

@Injectable({ providedIn: 'root' })
export class CommentService {

  private resourceUrl = env.serverApiUrl + 'comment';

  constructor(private http: HttpClient) {}

  create(comment: Comment): Observable<EntityResponseType> {
    return this.http.post<CommentVm>(`${this.resourceUrl}`, comment, { observe: 'response' });
  }

  getCandidateComment(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<CommentPage>(`${this.resourceUrl}/candidate/${id}`, { observe: 'response' });
  }


}
