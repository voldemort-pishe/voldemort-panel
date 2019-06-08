import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '@app/shared/services/auth.service';
import { SubscriptionService } from '@app/shared/services/data/subscription.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

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
        tap(isSubscriptionValid => {
          if (!isSubscriptionValid)
            this.router.navigate(['subscription'], { replaceUrl: true });
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
