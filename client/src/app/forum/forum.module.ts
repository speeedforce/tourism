import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { SharedModule } from './../shared/shared.module';
import { ForumRoutingModule } from './forum-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumComponent } from './components/forum/forum.component';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  imports: [
    CommonModule,
    ForumRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [ForumComponent, ArticleComponent, ArticleDetailsComponent]
})
export class ForumModule { }
