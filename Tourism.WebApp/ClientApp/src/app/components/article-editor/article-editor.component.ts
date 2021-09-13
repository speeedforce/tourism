import { IArticle } from './../../types/core';
import { SYSTEM_CONTENT } from 'src/content.const';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticleInput } from '../../types/core';
import { AuthenticationService } from '../../../api-authorization/authorize.service';
import * as moment from 'moment';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  loading: boolean = false;
  error: string;
  public editorForm: FormGroup;
  SYSTEM_CONTENT = SYSTEM_CONTENT;
  constructor(private formBuilder: FormBuilder,
    private articleServcice: ArticleService) { }
 

  ngOnInit() {
    this.editorForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      content: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]],
     
    });
  }

  get f() { return this.editorForm.controls; }

  ngOnDestroy(): void {
   
  }


  onSubmit() {
    this.submitted = true;

    if (this.editorForm.invalid){
      console.log(this.f.title.errors)
      return;
    }

    this.loading = true;
    const article: IArticleInput = {
      title: this.f.title.value,
      content: this.f.content.value,
      //2019-01-06T17:16:40YYYY-MM-DDTHH:mm
      created: moment().format('YYYY-MM-DDTHH:MM'),
      imageUrl: ''
    }
    this.articleServcice.create(article).subscribe({
      next: (response: IArticle) => {
        alert(SYSTEM_CONTENT.CONTENT.SUCCESS);
        this.loading = false;
        this.editorForm.reset();
      },   
      error: (message: string) => {
        console.log(message);
            this.error = message;
            this.loading = false;
      }
    })
  }
}
