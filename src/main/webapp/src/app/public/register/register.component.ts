import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'anms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'public');
  }

  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() {
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

}
