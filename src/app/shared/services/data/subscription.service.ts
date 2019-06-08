import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiResponse, ApiService } from '../api.service';
import { SubscriptionModel } from '@app/shared/model/subscription.model';
import { map, timeoutWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

    constructor(private api: ApiService) { }

    get(): Observable<ApiResponse<SubscriptionModel>> {
        return this.api.get<SubscriptionModel>('subscription/check');
    }

    isValid(): Observable<boolean> {
        return this.get().pipe(
            map(r => {
                // Considering a valid subscription in case of server internal error or request timeout
                // Server will check later and drop out user by sending 402 status if subscription is expired
                return !r.status || !(r.status >= 400 || r.status < 500);
            }),
            timeoutWith(5000, of(true)), // timeout request after 5 seconds and send true
        );
    }
}
