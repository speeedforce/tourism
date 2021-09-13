import { AuthenticationService } from 'src/api-authorization/authorize.service';

import { Observable } from 'rxjs';

import { UserService } from './../../services/user.service';
import { ForumService } from './../../services/forum.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArticleInput, IForum, User} from '../../types/core';
import { SYSTEM_CONTENT } from '../../../content.const';
import { getMockData } from './mock';

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
    private authService: AuthenticationService) { }
  

  ngOnInit() {

    this.forumService.get().subscribe(item => {
      this.forum = item;
      this.loading = false;
    });

    this.user = this.authService.userValue;
    console.log(this.user);
  }



  ngOnDestroy(): void {
  }

}
