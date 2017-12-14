import { Component, OnInit } from '@angular/core';
import { SceneService } from './scene.service';
import { Account } from '../../../../account.model';
import { Scene } from './model';

@Component({
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [SceneService]
})
export class SceneComponent implements OnInit {
  private userId: number;

  constructor(private sceneService: SceneService) {
    this.userId = this.getUserId();
    this.getAppWhiteList();
  }

  ngOnInit() {}

  private getUserId(): number {
    const account: Account = JSON.parse(localStorage.getItem('account'));
    return account.id;
  }

  private getAppWhiteList() {
    this.sceneService.getAppWhiteList(this.userId).subscribe((data: any) => {
      if ('2000' === data.code) {
      }
    });
  }
}
