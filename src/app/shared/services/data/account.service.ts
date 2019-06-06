import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { UserModel } from '@app/shared/model/user.model';
import { MessageModel } from '@app/shared/model/message.model';

@Injectable({ providedIn: 'root' })
export class AccountService {

    constructor(private api: ApiService) { }

    login(data: any): Observable<ApiResponse<{ token: string }>> {
        return this.api.post<{ token: string }>('account/authenticate', data);
    }

    register(data: any): Observable<ApiResponse<MessageModel>> {
        return this.api.post<MessageModel>('account/register', data);
    }

    active(key: string): Observable<ApiResponse<any>> {
        return this.api.get<any>(`account/activate/${key}`);
    }

    get(): Observable<ApiResponse<UserModel>> {
        return this.api.get<UserModel>('account');
    }

    save(account: any): Observable<ApiResponse<void>> {
        return this.api.post<void>('account', account);
    }
}
