import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AccountService } from '@app/shared/services/data/account.service';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  isLoading: boolean = false;
  error: string;

  public get emailCtrlError(): string {
    return this.emailCtrl.hasError('required') ? 'لطفا ایمیل خود را وارد کنید' :
      this.emailCtrl.hasError('email') ? 'ایمیل نامعتبر است' : null;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.emailCtrl = new FormControl(null, [Validators.email, Validators.required]);
    this.passwordCtrl = new FormControl(null, [Validators.required]);
    this.form = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  login(): void {
    this.isLoading = true;
    this.accountService.login(this.form.value).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.authService.onLoggedIn(r.data.token);
        this.router.navigate(['dashboard']);
      }
      else {
        this.snackBar.open(r.niceErrorMessage, 'بستن', { duration: 2500 });
      }
    });
  }
}
