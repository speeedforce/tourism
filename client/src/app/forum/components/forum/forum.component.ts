
import { AuthenticationService } from 'src/api-authorization/authorize.service';


import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArticleInput, IForum, User} from '../../../types/core';
import { SYSTEM_CONTENT } from '../../../../content.const';
import { getMockData } from './mock';
import { ForumService } from '../../services/forum.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  host: {
    class: 'page-styles'
  }
})
export class ForumComponent implements OnInit, OnDestroy {

  SYSTEM_CONTENT = SYSTEM_CONTENT;
  user: User;
  forum: IForum; //getMockData();
  loading: boolean = true;

  constructor(private forumService: ForumService,
    private articleService: ArticleService,
    private authService: AuthenticationService) { }
  
  ngOnInit() {
    console.log('I work');
    this.init();
    this.user = this.authService.userValue;
  }

  private init() {
    this.forumService.get().subscribe(item => {
      this.forum = item;
      this.loading = false;
    });

    // this.forum = getMockData();
  }

  delete(id: number) {
    console.log(id);
    if(window.confirm(SYSTEM_CONTENT.CONTENT.CONFIRM_WARNING)) {
      this.articleService.delete(id).subscribe({
        next: (response: boolean) => {
          alert(SYSTEM_CONTENT.CONTENT.SUCCESS);
          this.forum.articles = this.forum.articles.filter(a => a.id !== id);
        },   
        error: (message: string) => {
          alert(message);
        }
      })
    }
  }

  ngOnDestroy(): void {
  }

}
