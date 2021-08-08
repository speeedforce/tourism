import { AuthorizeGuard } from './../api-authorization/authorize.guard';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CounterComponent } from './counter/counter.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ForumComponent } from './components/forum/forum.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


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
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },

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
