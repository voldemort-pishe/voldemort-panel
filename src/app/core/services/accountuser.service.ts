import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from "@app/shared/model/message.model";
import { UserRegister } from "@app/shared/model/register.model";

import { environment as env } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AccountUserService {

  private resourceUrl = env.serverApiUrl + 'account';

  constructor(private http: HttpClient) {}

  register(user: UserRegister): Observable<HttpResponse<Message>> {
    return this.http.post<Message>(this.resourceUrl + "/register", user, { observe: 'response' });
  }

  active(key): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.resourceUrl}/activate/${key}`, { observe: 'response' });
  }

}
