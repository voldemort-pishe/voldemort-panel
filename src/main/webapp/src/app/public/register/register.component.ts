import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserRegister} from "@app/core/models/register.model";
import {AccountUserService} from "@app/core";
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'anms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  userRegisterForm: FormGroup;
  acceptAgreementError: boolean;

  constructor(private renderer: Renderer2,
              private fb: FormBuilder,
              private accountUserService: AccountUserService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.renderer.addClass(document.body, 'public');

    this.acceptAgreementError = false;
    this.userRegisterForm = fb.group({
      firstName: [null,[Validators.required, Validators.minLength(3)]],
      lastName: [null,[Validators.required,Validators.minLength(3)]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required,Validators.minLength(6)]],
      confirmPassword: [null,Validators.required],
      agreement: false
    },{validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'public');
  }

  register(submitBtn: HTMLButtonElement){
    submitBtn.disabled = true;

    this.acceptAgreementError = !this.userRegisterForm.value.agreement;

    if(this.userRegisterForm.valid){
      const userRegister: UserRegister = Object.assign({}, this.userRegisterForm.value);

      this.registerPromise(userRegister)
        .then(() => {
          submitBtn.disabled = false;
          this.router.navigate(['../verification']);
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

  private registerPromise(userRegister, callback?){
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.accountUserService.register(userRegister).subscribe(
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


  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

}
