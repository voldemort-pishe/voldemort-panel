import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '@app/shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated) {
            this.router.navigate(['dashboard'], { replaceUrl: true, queryParamsHandling: 'preserve' });
            return false;
        }
        return true;
    }
}
