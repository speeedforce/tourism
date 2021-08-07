import { ForumService } from './../../services/forum.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IForum } from 'src/app/types/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnDestroy {

  forum$: Observable<IForum>;
  constructor(private forumService: ForumService) { }
  

  ngOnInit() {
    this.forum$ = this.forumService.get();
  }

  ngOnDestroy(): void {
  }

}
