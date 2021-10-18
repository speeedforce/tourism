import { SYSTEM_CONTENT } from 'src/content.const';
import { IArticle } from '../../../types/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from '../../services/article.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: IArticle;

  SYSTEM_CONTENT = SYSTEM_CONTENT;
  constructor() { }

  ngOnInit() { }
}
