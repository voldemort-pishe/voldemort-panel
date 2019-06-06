import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, skip, filter } from 'rxjs/operators';
import { ApiService, ApiResponse } from './api.service';

interface DataWrapper<T> {
    url: string;
    subject$: BehaviorSubject<ApiResponse<T>>;
    isDataFetched: boolean;
    isDataFetching: boolean;
}

@Injectable({ providedIn: 'root' })
export class CacheService {

    dataWrappers: { [url: string]: DataWrapper<any> } = {};

    constructor(private apiService: ApiService) { }

    /**
     * Get data as an observable and complete subscription after emitting the first value.
     * @return an `Observable` of data type `T`.
     */
    getDataOnce<T>(url: string, forceUpdate: boolean = false, method: string = 'post', data: any = null): Observable<ApiResponse<T>> {
        let dw = this.getOrCreateDataWrapper<T>(url);

        if ((!dw.isDataFetched && !dw.isDataFetching) || forceUpdate)
            this.fetchData<T>(dw);

        if (!dw.subject$.getValue() || !dw.isDataFetched || forceUpdate)
            // skip initial value (null) or previous value if forceUpdate == true
            return dw.subject$.pipe(skip(1), take(1));
        else
            return dw.subject$.pipe(take(1));
    }

    /**
     * Get data as an observable. Any other new versions of data will be emitted in the subscription. 
     * The subscription won't closed by itself.
     * @return an `Observable` of data type `T`.
     */
    getDataSubscription<T>(url: string): Observable<ApiResponse<T>> {
        let dw = this.getOrCreateDataWrapper<T>(url);
        if (!dw.isDataFetched && !dw.isDataFetching)
            this.fetchData<T>(dw);
        return dw.subject$.pipe(filter(r => r != null));
    }

    /**
     * Invalidates data corresponding specified `url`. Future requests for getting it's data
     * will result in a new request to the api.
     */
    invalidateData(url: string): void {
        if (this.dataWrappers[url])
            this.dataWrappers[url].isDataFetched = false;
    }

    private getOrCreateDataWrapper<T>(url: string): DataWrapper<T> {
        if (!this.dataWrappers[url]) {
            this.dataWrappers[url] = {
                url: url,
                subject$: new BehaviorSubject<ApiResponse<T>>(null),
                isDataFetched: false,
                isDataFetching: false,
            };
        }
        return this.dataWrappers[url];
    }

    private fetchData<T>(dw: DataWrapper<T>): void {
        dw.isDataFetching = true;
        const request$ = this.apiService.get<T>(dw.url);

        request$.subscribe((r: ApiResponse<T>) => {
            dw.isDataFetching = false;
            if (r.success) dw.isDataFetched = true;
            dw.subject$.next(r);
        });
    }
}
