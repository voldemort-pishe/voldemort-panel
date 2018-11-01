import { Injectable } from '@angular/core';
import {Principal} from "@app/core/auth/principal.service";
import {AuthServerProvider} from "@app/core/auth/auth-jwt.service";
import {Router} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private principal: Principal,
              private authServerProvider: AuthServerProvider,
              private router: Router) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.principal.identity(true).then(account => {
            resolve(data);
          });
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  loginWithToken(jwt, rememberMe) {
    return this.authServerProvider.loginWithToken(jwt, rememberMe);
  }

  logout() {
    this.authServerProvider.logout().subscribe();
    this.principal.authenticate(null);
  }

  subscription(){
    this.router.navigate(['/plan']);
  }

}
