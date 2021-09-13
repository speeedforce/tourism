import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { AuthGuard } from './../api-authorization/helpers/authorize.guard';

import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CounterComponent } from './counter/counter.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ForumComponent } from './components/forum/forum.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Role } from './types/core';


const routes: Routes = [

  {
    path: '', component: HomeComponent, pathMatch: 'full',
    children:
      [
        { path: '', component: ForumComponent }
      ],
    redirectTo: ''
  },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
  { 
    path: 'admin/article', 
    component: ArticleEditorComponent, 
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

]


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
