import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {

    account: Account;

    constructor(private http: HttpClient) { }

    get(): Observable<HttpResponse<Account>> {
        return this.http.get<Account>(env.serverApiUrl + 'account', { observe: 'response' }).pipe(tap(r => this.account = r.body));
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(env.serverApiUrl + 'account', account, { observe: 'response' });
    }
}
