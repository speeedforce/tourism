import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '',   redirectTo: '/forum', pathMatch: 'full' },
  // { path: 'forum', component: ForumComponent},
  // { path: 'forum/article/:id', component: ArticleComponent},
  // { 
  //   path: 'admin/article', 
  //   component: ArticleEditorComponent, 
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin] }
  // },
  // { 
  //   path: 'admin/article/:id', 
  //   component: ArticleEditorComponent, 
  //   // canActivate: [AuthGuard],
  //   // data: { roles: [Role.Admin] }
  // },
  // // otherwise redirect to home
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
