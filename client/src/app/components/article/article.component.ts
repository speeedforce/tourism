import { SYSTEM_CONTENT } from 'src/content.const';
import { IArticle } from './../../types/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {


  @Input() article: IArticle;
  @Input() important: boolean = false;
  @Input() isAdmin: boolean = false;

  @Output() delete: EventEmitter<number> = new EventEmitter();

  SYSTEM_CONTENT = SYSTEM_CONTENT;
  constructor(private articleService: ArticleService) { }

  ngOnInit() { }

  onDelete(): void {
    this.delete.emit(this.article.id);
  }

}
