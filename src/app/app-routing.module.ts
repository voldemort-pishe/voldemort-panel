import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import { LoginComponent, RegisterComponent, VerificationComponent } from '@app/public';
import { PublicComponent, SecureComponent } from '@app/layouts';
import { UserRouteAccessService } from "@app/core/auth/user-route-access-service";
import {
  InvoicePreviewComponent,
  PlanComponent,
  CalenderComponent,
} from "@app/secure";

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
        loadChildren: './dashboard/dashboard.module#DashboardModule',
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
        path: 'candidates',
        loadChildren: './candidates/candidates.module#CandidatesModule',
      },
      {
        path: 'calendar',
        component: CalenderComponent,
        data: { title: 'anms.calender' }
      },
      {
        path: 'job',
        loadChildren: './jobs/jobs.module#JobsModule',
      },
      {
        path: 'configs',
        loadChildren: './configs/configs.module#ConfigsModule',
      },
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
export class AppRoutingModule { }
