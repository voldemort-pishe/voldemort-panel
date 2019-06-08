import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '@app/shared/services/auth.service';
import { AccountService } from '@app/shared/services/data/account.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated) {
      return this.accountService.getSubscriptionCheck().pipe(
        map(r => r.success),
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
