import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '@app/shared/shared.module';
import { RegisterInvitationComponent } from './register-invitation/register-invitation.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterInvitationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
