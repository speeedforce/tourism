import { IArticle } from './../../types/core';
import { SYSTEM_CONTENT } from 'src/content.const';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticleInput } from '../../types/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  loading: boolean = false;
  error: string;
  editorForm: FormGroup;
  SYSTEM_CONTENT = SYSTEM_CONTENT;
  sub: any;
  articleId?: number // can be null if create mode;
  article: IArticle;

  constructor(private formBuilder: FormBuilder,
    private articleServcice: ArticleService,
    private route: ActivatedRoute) { }
 

  ngOnInit() {

    this.articleId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id') : null;
   
    this.editorForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      content: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]],
    });    
       
    if (this.articleId !== null) {
      this.loading = true;
      this.init();
    }
  }

  get f() { return this.editorForm.controls; }

  ngOnDestroy(): void { }

  onSubmit() {
    this.submitted = true;

    if (this.editorForm.invalid){ 
      return;
    }

    this.loading = true;
   
    if (this.articleId === null) 
      this.create();
    else 
      this.update();
   
  }

  private update(): void {
    this.article.title = this.f.title.value;
    this.article.content = this.f.content.value;
    this.article.created =  moment().format('YYYY-MM-DDTHH:MM');
  
    this.articleServcice.edit(this.articleId, this.article).subscribe({
      next: (response: IArticle) => {
        alert(SYSTEM_CONTENT.CONTENT.SUCCESS);
        this.loading = false;
      },   
      error: (message: string) => {
        this.error = message;
        this.loading = false;     
      }
    })
  }

  private create(): void {

    const article: IArticleInput = {
      title: this.f.title.value,
      content: this.f.content.value,
      created: moment().format('YYYY-MM-DDTHH:MM'),
      imageUrl: ''  
    }

    this.articleServcice.create(article).subscribe({
      next: (response: IArticle) => {
        this.loading = false;
        this.editorForm.reset();
        alert(SYSTEM_CONTENT.CONTENT.SUCCESS);
  
      },   
      error: (message: string) => {
        this.error = message;
        this.loading = false;     
      }
    })
  }


  private init(): void { 
    this.articleServcice.getById(this.articleId).subscribe((article: IArticle) => {
      this.f.title.patchValue(article.title);
      this.f.content.patchValue(article.content);
      this.article = article;
      this.loading = false;
    })
  }
}
