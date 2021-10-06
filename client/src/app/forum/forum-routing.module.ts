import { ForumComponent } from './components/forum/forum.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';


const routes: Routes = [
  { path: 'home', redirectTo: '/forum' },
  { path: 'forum',  component: ForumComponent },
  { path: 'forum/article/:id', component: ArticleComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ForumRoutingModule { }