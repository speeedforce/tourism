import { IArticleInput } from './../../types/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {


  @Input() article: IArticleInput;
  @Input() important: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
