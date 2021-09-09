import { AuthenticationService } from 'src/api-authorization/authorize.service';

import { Observable } from 'rxjs';

import { UserService } from './../../services/user.service';
import { ForumService } from './../../services/forum.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArticleInput, IForum, User} from '../../types/core';
import { SYSTEM_CONTENT } from '../../../content.const';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, OnDestroy {

  SYSTEM_CONTENT = SYSTEM_CONTENT;
  user: User;
  forum: IForum = {
    id: 0,
    description: '',
    title: '',
    articles: [
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/autumn.jpg'
      },
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/spring.jpg'
      },
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/summer.jpg'
      },
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/winter.jpg'
      },
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/winter.jpg'
      },
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/winter.jpg'
      },
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/winter.jpg'
      },
      {
        author: "Stas Zinoviev",
        title: "Defaul artcile",
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys  ' +
        'standard dummy text ever since the 1500s, when an unknown printer  ' +
        'took a galley of type and scrambled it to make a type specimen book.  ' +
        'It has survived not only five centuries, but also the leap into  ' +
        'electronic typesetting, remaining essentially unchanged.  ' +
        'It was popularised in the 1960s with the release of  ' +
        'Letraset sheets containing Lorem Ipsum passages,  ' +
        'and more recently with desktop publishing software like  ' +
        'Aldus PageMaker including versions of Lorem Ipsum.',
        created: new Date().toDateString(),
        imageUrl: 'assets/pictures/winter.jpg'
      }
    ],
    imageUrl: '',
    created: ''
  };
  loading: boolean = true;

  public default: IArticleInput = {
    author: "Stas Zinoviev",
    title: "Defaul artcile",
    content: 'Lorem Ipsum is simply dummy text of the printing and ' +
    'typesetting industry. Lorem Ipsum has been the industrys  ' +
    'standard dummy text ever since the 1500s, when an unknown printer  ' +
    'took a galley of type and scrambled it to make a type specimen book.  ' +
    'It has survived not only five centuries, but also the leap into  ' +
    'electronic typesetting, remaining essentially unchanged.  ' +
    'It was popularised in the 1960s with the release of  ' +
    'Letraset sheets containing Lorem Ipsum passages,  ' +
    'and more recently with desktop publishing software like  ' +
    'Aldus PageMaker including versions of Lorem Ipsum.',
    created: new Date().toDateString(),
    imageUrl: 'assets/pictures/autumn.jpg'
  }

  constructor(private forumService: ForumService,
    private authService: AuthenticationService) { }
  

  ngOnInit() {

    // this.forumService.get().subscribe(item => {
    //   this.forum = item;
    //   this.loading = false;
    // });

    this.user = this.authService.userValue;
    console.log(this.user);
  }



  ngOnDestroy(): void {
  }

}
