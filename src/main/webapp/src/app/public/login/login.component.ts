import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "@app/core/login/login.service";
import {Router} from '@angular/router';
import {StateStorageService} from "@app/core/auth/state-storage.service";
import {MatSnackBar} from '@angular/material';
import { MatProgressButtonOptions } from 'mat-progress-buttons'


@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  userLoginForm: FormGroup;
  loginButton: MatProgressButtonOptions = {
    active: false,
    text: 'ورود',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: true,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(private renderer: Renderer2,
              private loginService: LoginService,
              private router: Router,
              private stateStorageService: StateStorageService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.renderer.addClass(document.body, 'public');

    this.userLoginForm = fb.group({
      username: ['',[Validators.email,Validators.required]],
      password: ['',Validators.required],
      rememberMe: false
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'public');
  }

  login() {
    this.loginButton.disabled = true;
    if(this.userLoginForm.valid){
      this.loginButton.active = true;
      this.loginService
        .login({
          username: this.userLoginForm.controls.username.value,
          password: this.userLoginForm.controls.password.value,
          rememberMe: this.userLoginForm.controls.rememberMe.value
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
          }else{
            this.router.navigate(['/dashboard']);
          }
        })
        .catch((err) => {
          this.loginButton.active = false;
          this.loginButton.disabled = false;
          this.snackBar.open(err.error.message, "بستن", {
            duration: 2500
          });
        });
    }else{
      this.loginButton.disabled = false;
    }
  }

}
