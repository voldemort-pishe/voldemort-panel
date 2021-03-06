import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export interface ApiResponse<T> {
    success: boolean;
    status: number;
    data?: T;
    error?: string | any;
    niceErrorMessage?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {

    private readonly baseUrl: string = environment.serverApiUrl;
    private readonly requestTimeout: number = 30_000;

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
    ) { }

    public get<T>(url: string, data: { [param: string]: string | string[] } = null): Observable<ApiResponse<T>> {
        return this.http.get<T>(this.getUrl(url), this.getHttpOptions(data))
            .pipe(
                map(this.handleSuccess),
                timeout(this.requestTimeout),
                catchError((err: any, caught: Observable<any>) => this.handleError(err, url))
            );
    }

    public post<T>(url: string, data: any = null): Observable<ApiResponse<T>> {
        return this.http.post<T>(this.getUrl(url), data, this.getHttpOptions())
            .pipe(
                map(this.handleSuccess),
                timeout(this.requestTimeout),
                catchError((err: any, caught: Observable<any>) => this.handleError(err, url))
            );
    }

    public put<T>(url: string, data: any = null): Observable<ApiResponse<T>> {
        return this.http.put<T>(this.getUrl(url), data, this.getHttpOptions())
            .pipe(
                map(this.handleSuccess),
                timeout(this.requestTimeout),
                catchError((err: any, caught: Observable<any>) => this.handleError(err, url))
            );
    }

    public delete<T>(url: string): Observable<ApiResponse<T>> {
        return this.http.delete<T>(this.getUrl(url), this.getHttpOptions())
            .pipe(
                map(this.handleSuccess),
                timeout(this.requestTimeout),
                catchError((err: any, caught: Observable<any>) => this.handleError(err, url))
            );
    }

    private getUrl(url: string): string {
        return this.baseUrl + url;
    }

    private handleSuccess<T>(response: HttpResponse<T>): ApiResponse<T> {
        return {
            success: true,
            status: response.status,
            data: response.body,
        };
    }

    private handleError(error: any, url: string): Observable<ApiResponse<any>> {
        let errorData: any;
        let niceErrorMsg: string;

        if (error instanceof HttpErrorResponse) {
            errorData = error.error;

            if (errorData instanceof ErrorEvent) {
                niceErrorMsg = `???????????????? ?????????? ???? ???????????? ?????? ??????. (?????????????? ??????????: ${errorData.message})`;
                console.error('A client-side or network error occurred', errorData.message);
            }
            else {
                if (error.status === 0)
                    niceErrorMsg = `???????????? ???? ?????????????? ?????????? ???????? ????????.`;
                else if (error.status >= 500 && error.status < 600)
                    niceErrorMsg = `???????????????? ?????????? ?????? ???????? ???? ??????. (???? ??????: ${error.status})`;
                else if (errorData && errorData.message && errorData.message.match('[\u0600-\u06FF]+')) // regex to check if any persian chars exist
                    niceErrorMsg = errorData.message;
                else
                    niceErrorMsg = `???????????????? ?????????? ???????????? ?????? ???????? ???? ??????. (???? ??????: ${error.status})`;

                if (error.status === 401) // provided credentials is incorrect
                    this.authService.logout();
                else if (error.status === 402) // subscription expired
                    this.router.navigate(['subscription']);

                console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(errorData)}`);
            }
        }
        else if (error instanceof TimeoutError) {
            errorData = error;
            niceErrorMsg = `???????????????? ?????????? ???? ?????? ???????? ???????????? ??????.`;
            console.error(`Request timeout: ${url}`);
        }
        else {
            errorData = error;
            niceErrorMsg = `???????? ????????????`;
            console.error('Unknown error', error);
        }

        return of({
            success: false,
            status: error.status,
            error: errorData,
            niceErrorMessage: niceErrorMsg,
        });
    }

    private getHttpOptions(urlParamsObject: { [param: string]: string | string[] } = null): any {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        if (this.authService.authToken)
            headers = headers.set('Authorization', `Bearer ${this.authService.authToken}`);

        let params: HttpParams;
        if (urlParamsObject) params = new HttpParams({ fromObject: urlParamsObject });

        const result = {
            headers: headers,
            params: params,
            observe: 'response',
        }
        return result;
    }
}
