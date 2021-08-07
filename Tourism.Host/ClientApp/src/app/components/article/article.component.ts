import { IArticleInput } from './../../types/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {


  @Input() article: IArticleInput;

  constructor() { }

  ngOnInit() {
  }

}
