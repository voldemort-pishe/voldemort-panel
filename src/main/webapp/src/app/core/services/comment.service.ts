import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {CommentVm} from "@app/shared/model/comment-vm.model";
import {Comment} from "@app/shared/model/comment.model";

type EntityResponseType = HttpResponse<CommentVm>;

@Injectable({ providedIn: 'root' })
export class CommentService {

  private resourceUrl = env.serverApiUrl + 'comment';

  constructor(private http: HttpClient) {}

  create(comment: Comment): Observable<EntityResponseType> {
    return this.http.post<CommentVm>(`${this.resourceUrl}`, comment, { observe: 'response' });
  }


}
