import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoggedInGuardService } from './guards/logged-in-guard.service';
import { MainComponent } from './main/main.component';
import { PlanComponent } from './plan/plan.component';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubscriptionGuardService } from './guards/subscription-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [LoggedInGuardService],
        loadChildren: '../auth/auth.module#AuthModule',
    },
    {
        path: 'subscription',
        loadChildren: '../subscription/subscription.module#SubscriptionModule',
        canActivate: [SubscriptionGuardService],
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'candidates',
                loadChildren: '../candidates/candidates.module#CandidatesModule',
            },
            {
                path: 'calendar',
                loadChildren: '../calendar/calendar.module#CalendarModule',
            },
            {
                path: 'job',
                loadChildren: '../jobs/jobs.module#JobsModule',
            },
            {
                path: 'configs',
                loadChildren: '../configs/configs.module#ConfigsModule',
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
