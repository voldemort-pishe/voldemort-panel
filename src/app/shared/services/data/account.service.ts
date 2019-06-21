import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { UserModel } from '@app/shared/model/user.model';
import { MessageModel } from '@app/shared/model/message.model';
import { CredentialModel } from '@app/shared/model/credential.model';
import { CacheService } from '../cache.service';
import { Permission } from '@app/shared/model/enumeration/permission';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {

    constructor(
        private api: ApiService,
        private cache: CacheService,
    ) { }

    login(data: any): Observable<ApiResponse<CredentialModel>> {
        return this.api.post<CredentialModel>('account/authenticate', data);
    }

    register(data: any): Observable<ApiResponse<MessageModel>> {
        return this.api.post<MessageModel>('account/register', data);
    }

    registerByInvite(data: any): Observable<ApiResponse<CredentialModel>> {
        return this.api.post<CredentialModel>('account/register-by-invite', data);
    }

    activate(otp: string): Observable<ApiResponse<CredentialModel>> {
        return this.api.get<CredentialModel>(`account/activate/${otp}`);
    }

    get(): Observable<ApiResponse<UserModel>> {
        return this.cache.getDataOnce<UserModel>('account');
    }

    save(account: any): Observable<ApiResponse<void>> {
        return this.api.post<void>('account', account);
    }

    hasPermissions(...permissions: Permission[]): Observable<boolean> {
        return this.get().pipe(map(r => {
            if (!r.success) return true;
            if (!r.data.authorities) return false;

            const allPermissions: Permission[] = r.data.authorities
                .map(a => a.permissions ? a.permissions : [])
                .reduce((a, b) => a.concat(b));

            return permissions
                .map(p => !!allPermissions.find(_p => p === _p))
                .reduce((a, b) => a && b);
        }));
    }
}
