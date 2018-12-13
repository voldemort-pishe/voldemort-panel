import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserRegister} from "@app/shared/model/register.model";
import {AccountUserService} from "@app/core";
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons'


@Component({
  selector: 'anms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  userRegisterForm: FormGroup;
  acceptAgreementError: boolean;
  registerButton: MatProgressButtonOptions = {
    active: false,
    text: 'ثبت نام',
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
      cellphone: [null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/g),
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      ],
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

  register(){
    this.registerButton.disabled = true;
    this.acceptAgreementError = !this.userRegisterForm.value.agreement;
    if(this.userRegisterForm.valid){
      this.registerButton.active = true;

      const userRegister: UserRegister = Object.assign({}, this.userRegisterForm.value);

      this.accountUserService
        .register(userRegister)
        .toPromise()
        .then(response => {
          this.registerButton.disabled = false;
          this.router.navigate(['../verification']);
        })
        .catch(err => {
          this.snackBar.open(err.error.message, "بستن", {
            duration: 2500
          });
          this.registerButton.active = false;
          this.registerButton.disabled = false;
        });

    }else{
      this.registerButton.disabled = false;
    }
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
