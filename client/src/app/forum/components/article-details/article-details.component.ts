import { AuthenticationService } from './../../../../api-authorization/authorize.service';
import { UserService } from './../../../services/user.service';
import { Observable } from 'rxjs';
import { ArticleService } from './../../services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/types/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { mockArticle } from './mock';
import { SYSTEM_CONTENT } from 'src/content.const';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  article$;
  @Input() isAdmin: boolean;

  SYSTEM_CONTENT = SYSTEM_CONTENT;
  constructor(private articleService: ArticleService,
              private authService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        // this.articleService.getById(+params.get('id')))
        mockArticle())

      
    );

   

    this.article$.subscribe(q => console.log(q));
  }

}
