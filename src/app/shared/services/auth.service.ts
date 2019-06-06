import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authToken: string;
    public get authToken(): string {
        return this._authToken;
    }

    public get isAuthenticated(): boolean {
        return !!this.authToken;
    }

    constructor() {
        this._authToken = localStorage.getItem('authToken');
    }

    public onLoggedIn(token: string): void {
        this.setAuthToken(token);
    }

    public logout(): void {
        this.setAuthToken(null);
        localStorage.clear();
        window.location.href = '/';
    }

    private setAuthToken(v: string): void {
        if (v) localStorage.setItem('authToken', v);
        else localStorage.removeItem('authToken');
        this._authToken = v;
    }
}
