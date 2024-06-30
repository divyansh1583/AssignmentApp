import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashAuthGuard } from '../guards/dash-auth.guard';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, canActivate: [dashAuthGuard],
    // children: [
    //   { path: 'dashboard', component: DashboardComponent },
    //   { path: 'profile', component: ProfileComponent },
    // ]
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
