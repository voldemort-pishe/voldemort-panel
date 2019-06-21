import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { AccountService } from '@app/shared/services/data/account.service';

@Component({
  selector: 'anms-register-invitation',
  templateUrl: './register-invitation.component.html',
  styleUrls: ['./register-invitation.component.scss']
})
export class RegisterInvitationComponent implements OnInit {

  requestForm: FormGroup;
  isTermsAccepted: boolean = false;
  isSubmittingRequest: boolean = false;
  error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.requestForm = new FormGroup({
      invitationKey: new FormControl(null, Validators.required),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      cellphone: new FormControl(null, [Validators.required, Validators.pattern(/^(09)[0-9]{9}$/), Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null),
    }, this.passwordsMatchValidator);

    this.route.queryParamMap.subscribe(p => {
      if (p.has('key'))
        this.requestForm.patchValue({ invitationKey: p.get('key') });
      else
        this.router.navigate(['auth', 'login'], { replaceUrl: true });
    });
  }

  register(): void {
    if (this.isSubmittingRequest || !this.isTermsAccepted) return;

    this.isSubmittingRequest = true;
    this.error = null;
    this.accountService.registerByInvite(this.requestForm.value).subscribe(r => {
      this.isSubmittingRequest = false;
      if (r.success) {
        this.authService.onLoggedIn(r.data.token);
        this.router.navigate(['dashboard']);
      }
      else {
        this.error = r.niceErrorMessage;
      }
    });
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
