import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient) {}

    get(): Observable<HttpResponse<Account>> {
        return this.http.get<Account>(env.serverApiUrl + 'api/account', { observe: 'response' });
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(env.serverApiUrl + 'api/account', account, { observe: 'response' });
    }
}
