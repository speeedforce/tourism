import { UserProfileComponent } from './user-profile/user-profile.component';
import { Role } from './types/core';
import { AuthGuard } from './../api-authorization/helpers/authorize.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '',   redirectTo: 'forum', pathMatch: 'full' },
  { 
    path: 'forum', 
    loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule),
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin]}
  },
  { path: '**', component: PageNotFoundComponent }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
