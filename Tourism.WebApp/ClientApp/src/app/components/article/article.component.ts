import { IArticleInput } from './../../types/core';
import { Component, Input, OnInit } from '@angular/core';
import { SYSTEM_CONTENT } from 'src/content.const';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {


  @Input() article: IArticleInput;
  @Input() important: boolean = false;
  @Input() isAdmin: boolean = false;

  SYSTEM_CONTENT = SYSTEM_CONTENT;
  constructor() { }

  ngOnInit() {
  }

}
