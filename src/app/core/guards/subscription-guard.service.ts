import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '@app/shared/services/auth.service';
import { AccountService } from '@app/shared/services/data/account.service';
import { map, tap } from 'rxjs/operators';
import { SubscriptionService } from '@app/shared/services/data/subscription.service';

@Injectable({ providedIn: 'root' })
export class SubscriptionGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private subscriptionService: SubscriptionService,
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated) {
            return this.subscriptionService.isValid().pipe(
                map(r => !r),
                tap(isSubscriptionExpired => {
                    if (!isSubscriptionExpired)
                        this.router.navigate(['dashboard'], { replaceUrl: true });
                }),
            );
        }
        else {
            this.router.navigate(['auth', 'login'], {
                queryParams: { onSuccess: state.url },
                replaceUrl: true,
            });
            return false;
        }
    }
}
