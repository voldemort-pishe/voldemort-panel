import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import {LoginComponent, RegisterComponent, VerificationComponent} from '@app/public';
import {PublicComponent, SecureComponent} from '@app/layouts';
import {DashboardComponent} from '@app/secure/dashboard';
import {UserRouteAccessService} from "@app/core/auth/user-route-access-service";
import {
  CandidateComponent,
  CandidatePageComponent,
  InvoicePreviewComponent,
  PlanComponent,
  CalenderComponent,
  JobComponent,
  JobPageComponent} from "@app/secure";

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: '',
    component: PublicComponent,
    data: {
      title: 'Public Views'
    },
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'anms.register' }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'anms.login' }
      },
      {
        path: 'verification',
        component: VerificationComponent,
        data: { title: 'anms.verification' }
      }
    ]
  },
  {
    path: '',
    component: SecureComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Secure Views',
      authorities: ['ROLE_USER']
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'anms.dashboard' }
      },
      {
        path: 'plan',
        component: PlanComponent,
        data: { title: 'anms.plan' }
      },
      {
        path: 'invoice/:invoiceId',
        component: InvoicePreviewComponent,
        data: { title: 'anms.invoice' }
      },
      {
        path: 'candidate',
        component: CandidateComponent,
        data: { title: 'anms.candidate' }
      },
      {
        path: 'candidate/:candidateId',
        component: CandidatePageComponent,
        data: { title: 'anms.candidate' }
      },
      {
        path: 'calendar',
        component: CalenderComponent,
        data: { title: 'anms.calender' }
      },
      {
        path: 'job',
        component: JobComponent,
        data: { title: 'anms.job' }
      },
      {
        path: 'job/:jobId',
        component: JobPageComponent,
        data: { title: 'anms.job' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
       scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
