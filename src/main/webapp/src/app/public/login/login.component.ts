import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoginService} from "@app/core/login/login.service";
import {Router} from '@angular/router';
import {StateStorageService} from "@app/core/auth/state-storage.service";


@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: FormControl;
  password: FormControl;
  rememberMe : boolean;

  constructor(private renderer: Renderer2,
              private loginService: LoginService,
              private router: Router,
              private stateStorageService: StateStorageService) {
    this.renderer.addClass(document.body, 'public');
  }

  ngOnInit() {
    this.username = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'public');
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'فیلد نام کاربری اجباری است' : this.username.hasError('email') ? 'نام کابری صحیح نیست' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'فیلد کلمه عبور اجباری است' : '';
  }

  login() {
    this.loginService
      .login({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .then(() => {
        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is succesful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigate([redirect]);
        }
      })
      .catch(() => {
        console.log('error');
      });
  }

}
