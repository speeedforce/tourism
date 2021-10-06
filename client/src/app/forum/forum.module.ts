import { ForumRoutingModule } from './forum-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumComponent } from './components/forum/forum.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';


@NgModule({
  imports: [
    CommonModule,
    ForumRoutingModule,
    ReactiveFormsModule
   
  ],
  declarations: [ForumComponent, ArticleComponent, ArticleEditorComponent]
})
export class ForumModule { }
