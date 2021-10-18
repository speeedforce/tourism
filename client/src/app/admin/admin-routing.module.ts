import { ManageForumComponent } from './components/manage-forum/manage-forum.component';

import { AuthGuard } from './../../api-authorization/helpers/authorize.guard';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'article/:id', component: ArticleEditorComponent},
          { path: 'manage', component: ManageForumComponent }
        ]
      },
    ],
  },
  
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
