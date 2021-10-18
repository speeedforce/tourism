import { HomeComponent } from './components/home/home.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ForumComponent } from './components/forum/forum.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    children: [
      { path: '', component: ForumComponent},  
      { path: 'article/:id', component: ArticleDetailsComponent},  
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }