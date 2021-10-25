
import { SYSTEM_CONTENT } from 'src/content.const';
import { ArticleService } from '../../../forum/services/article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { IArticle, IArticleInput } from 'src/app/types/core';


export function requiredFileType( type: string[] ) {
  return function (control: FormControl) {

    if (control === null || control.value === null) return;
   
    if ('length' in control.value) {
      const files = Array.from(control.value);
      files.forEach((element: File) => {
        const extension = element.name.split('.')[1].toLowerCase();
        if (!type.includes(extension)) {
          return { requiredFileType: true };
        }
        return null;
      });
    } else {
      const file = control.value;
      const extension = file.name.split('.')[1].toLowerCase();
      if (!type.includes(extension)) {
        return { requiredFileType: true };
      }

      return null;
    }

    return null;
  };
}

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit, OnDestroy {

  logoUrl: string;
  success: boolean = false;
  loading: boolean = false;
  error: string;
  editorForm: FormGroup;
  SYSTEM_CONTENT = SYSTEM_CONTENT;
  sub: any;
  articleId?: number // can be null if create mode;
  article: IArticle;

  constructor(
    private articleServcice: ArticleService,
    private route: ActivatedRoute) { }
 

  ngOnInit() {

    this.articleId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id') : null;
   
    this.editorForm = new FormGroup({
      title: new FormControl(null,
           [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      text: new FormControl(null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(512)]), 
      
      logo: new FormControl(null, [Validators.required, requiredFileType(['jpg'])]),
      attachments:  new FormControl(null, [requiredFileType(['jpg', 'png'])]),
      docs:  new FormControl(null, [requiredFileType(['doc', 'docx'])]),
    });    
       
    if (this.articleId !== null) {
      this.loading = true;
      this.init();
    }
  }

  hasError( field: string, error: string ) {
    const control = this.editorForm.get(field);
    return control.dirty && control.hasError(error);
  }

  get f() { return this.editorForm.controls; }

  ngOnDestroy(): void { }

  onSubmit() {
    this.success = false;
   
    if ( !this.editorForm.valid ) {
      markAllAsDirty(this.editorForm);
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
    this.article.text = this.f.content.value;
    this.article.created =  moment().format('YYYY-MM-DDTHH:MM');

    
    const update:IArticleInput = {
       title: this.article.title,
       text: this.article.text,
       content: [...this.article.attachments, ...this.article.docs],
       created: this.article.created,
       imageUrl: this.article.imageUrl
    }
  
    this.articleServcice.edit(this.articleId, update).subscribe({
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

    let content = [...this.f.attachments.value, ...this.f.docs.value];
    let article = toFormData({
      title: this.f.title.value,
      text: this.f.text.value,
      created: moment().format('YYYY-MM-DDTHH:MM'),
      imageUrl: this.f.logo.value,
      docs: JSON.stringify(this.f.docs.value),
      content: JSON.stringify(content)
    })
   
    article.append('docs', JSON.stringify(this.f.docs.value));
    article.append('content', JSON.stringify(content));

    this.articleServcice.create(article).subscribe({
      next: (response: IArticle) => {
        this.loading = false;
        alert(SYSTEM_CONTENT.CONTENT.SUCCESS);
        this.success = true;
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
      this.f.text.patchValue(article.text);
      this.article = article;
      this.loading = false;
    })
  }

}


export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}

export function toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
