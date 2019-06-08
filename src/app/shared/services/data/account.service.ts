import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { UserModel } from '@app/shared/model/user.model';
import { MessageModel } from '@app/shared/model/message.model';
import { CredentialModel } from '@app/shared/model/credential.model';

@Injectable({ providedIn: 'root' })
export class AccountService {

    constructor(private api: ApiService) { }

    login(data: any): Observable<ApiResponse<CredentialModel>> {
        return this.api.post<CredentialModel>('account/authenticate', data);
    }

    register(data: any): Observable<ApiResponse<MessageModel>> {
        return this.api.post<MessageModel>('account/register', data);
    }

    activate(otp: string): Observable<ApiResponse<CredentialModel>> {
        return this.api.get<CredentialModel>(`account/activate/${otp}`);
    }

    get(): Observable<ApiResponse<UserModel>> {
        return this.api.get<UserModel>('account');
    }

    save(account: any): Observable<ApiResponse<void>> {
        return this.api.post<void>('account', account);
    }
}
