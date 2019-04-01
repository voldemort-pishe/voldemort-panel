import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { environment } from '@env/environment';
import { LoginService } from '../login/login.service';

export interface ApiResponse<T> {
    success: boolean;
    status: number;
    data?: T;
    error?: string | any;
    niceErrorMessage?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    private readonly baseUrl: string = environment.serverApiUrl;
    private readonly requestTimeout: number = 30_000;

    constructor(
        private http: HttpClient,
        private loginService: LoginService,
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

    private logout(): void {
        this.loginService.logout();
        // window.location.href = '/';
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
                niceErrorMsg = `متأسفانه مشکلی در برنامه پیش آمد. (توضیحات بیشتر: ${errorData.message})`;
                console.error('A client-side or network error occurred', errorData.message);
            }
            else {
                if (error.status === 0)
                    niceErrorMsg = `دسترسی به اینترنت امکان پذیر نیست.`;
                else if (error.status >= 500 && error.status < 600)
                    niceErrorMsg = `متأسفانه خطایی سمت سرور رخ داد. (کد خطا: ${error.status})`;
                else if (errorData && errorData.message && errorData.message.match('[\u0600-\u06FF]+')) // regex to check if any persian chars exist
                    niceErrorMsg = errorData.message;
                else
                    niceErrorMsg = `متأسفانه خطایی نامشخص سمت سرور رخ داد. (کد خطا: ${error.status})`;

                if (error.status === 401) // provided credentials is incorrect
                    this.logout();

                console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(errorData)}`);
            }
        }
        else if (error instanceof TimeoutError) {
            errorData = error;
            niceErrorMsg = `متأسفانه پاسخی از سمت سرور دریافت نشد.`;
            console.error(`Request timeout: ${url}`);
        }
        else {
            errorData = error;
            niceErrorMsg = `خطای نامشخص`;
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
        // if (this.authToken)
        //     headers = headers.set('Authorization', this.authToken);

        let params: HttpParams;
        if (urlParamsObject) params = new HttpParams({ fromObject: urlParamsObject });

        let result = {
            headers: headers,
            params: params,
            observe: 'response',
        }
        return result;
    }
}
