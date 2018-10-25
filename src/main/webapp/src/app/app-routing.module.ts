import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import {LoginComponent, RegisterComponent} from '@app/public';
import {PublicComponent, SecureComponent} from '@app/layouts';
import {DashboardComponent} from '@app/secure/dashboard';
import {UserRouteAccessService} from "@app/core/auth/user-route-access-service";


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
    ]
  },
  {
    path: '',
    component: SecureComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Secure Views',
      authorities: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'anms.dashboard' }
      },
    ]
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
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
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
