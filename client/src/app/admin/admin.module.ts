
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { FileUploadComponent } from './components/app-file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent, ArticleEditorComponent, FileUploadComponent]
})
export class AdminModule { }
