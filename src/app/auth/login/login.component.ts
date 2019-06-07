import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { AccountService } from '@app/shared/services/data/account.service';
import { AuthService } from '@app/shared/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  error: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(false),
    });

    this.matIconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg'));
  }

  login(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.error = null;
    this.accountService.login(this.form.value).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.authService.onLoggedIn(r.data.token);
        this.router.navigate(['dashboard']);
      }
      else {
        this.error = r.niceErrorMessage;
      }
    });
  }
}
