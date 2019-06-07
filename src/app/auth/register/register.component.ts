import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { AccountService } from '@app/shared/services/data/account.service';

@Component({
  selector: 'anms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  requestForm: FormGroup;
  verificationForm: FormGroup;
  isTermsAccepted: boolean = false;
  isRequesting: boolean = true;
  isSubmittingRequest: boolean = false;
  isSubmittingVerification: boolean = false;
  error: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.requestForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      cellphone: new FormControl(null, [Validators.required, Validators.pattern(/^(09)[0-9]{9}$/), Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null),
    }, this.passwordsMatchValidator);

    this.verificationForm = new FormGroup({
      otp: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });
  }

  register(): void {
    if (this.isSubmittingRequest || !this.isTermsAccepted) return;

    this.isSubmittingRequest = true;
    this.error = null;
    this.accountService.register(this.requestForm.value).subscribe(r => {
      this.isSubmittingRequest = false;
      if (r.success) {
        this.isRequesting = false;
      }
      else {
        this.error = r.niceErrorMessage;
      }
    });
  }

  verify(): void {
    if (this.isSubmittingVerification) return;

    this.isSubmittingVerification = true;
    this.error = null;
    this.accountService.activate(this.verificationForm.get('otp').value).subscribe(r => {
      this.isSubmittingVerification = false;
      if (r.success) {
        this.authService.onLoggedIn(r.data.token);
        this.router.navigate(['dashboard']);
      }
      else {
        this.error = r.niceErrorMessage;
      }
    });
  }

  back(): void {
    this.error = null;
    this.isRequesting = true;
  }

  private passwordsMatchValidator(form: FormGroup): ValidationErrors | null {
    const passwordCtrl = form.get('password');
    const confirmPasswordCtrl = form.get('confirmPassword');
    if (passwordCtrl.value !== confirmPasswordCtrl.value) {
      const err = { passwordMismatch: true };
      confirmPasswordCtrl.setErrors(err);
      return err;
    }
    else {
      confirmPasswordCtrl.setErrors(null);
      return null;
    }
  }
}
