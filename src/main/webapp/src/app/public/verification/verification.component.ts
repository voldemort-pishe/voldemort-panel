import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountUserService} from "@app/core";
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LoginService} from "@app/core/login/login.service";

@Component({
  selector: 'anms-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit, OnDestroy {

  verificationForm: FormGroup;

  constructor(private renderer: Renderer2,
              private fb: FormBuilder,
              private accountUserService: AccountUserService,
              private loginService: LoginService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.renderer.addClass(document.body, 'public');

    this.verificationForm = fb.group(
      {
        verifyCode: [null, [Validators.required, Validators.minLength(3)]]
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'public');
  }

  verify(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;

    if(this.verificationForm.valid){

      this.verifyPromise(this.verificationForm.value.verifyCode)
        .then((response) => {
          submitBtn.disabled = false;
          this.loginService.loginWithToken(response.body.token,false);
          this.router.navigate(['../dashboard']);
        })
        .catch((response) => {
          this.snackBar.open(response.error.message, "بستن", {
            duration: 2500
          });
          submitBtn.disabled = false;
        });

    }else{
      submitBtn.disabled = false;
    }

  }

  private verifyPromise(key, callback?){
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.accountUserService.active(key).subscribe(
        data => {
          resolve(data);
          return cb();
        },
        err => {
          reject(err);
          return cb(err);
        }
      );
    });

  }


}
