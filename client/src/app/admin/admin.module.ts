import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/Dashboard/Dashboard.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent, DashboardComponent, ArticleEditorComponent]
})
export class AdminModule { }
