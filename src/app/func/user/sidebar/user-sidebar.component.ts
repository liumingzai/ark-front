import { Component, OnInit, OnChanges } from '@angular/core';
import { Account } from '../../../account.model';
import { Router } from '@angular/router';

import { seaData } from '../user-type';

@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponents implements OnInit {
  public admindatas: seaData[];
  public account: Account;
  public rooturl: string;
  constructor(private router: Router) {}
  public ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('account'));
    if (this.account['roles'][0]['description'] === '一般用户') {
      this.admindatas = [
        {
          slidetitle: '账号管理',
          group: ['我的账号', '我的收藏', '充值记录', ''],
          rooturl: ['', '', '']
        },
        {
          slidetitle: '接口管理',
          group: ['场景(IP白名单)管理', '我的订单', '调用记录', '接口总览'],
          rooturl: ['', '', '', '']
        }
      ];
    } else {
      this.admindatas = [
        {
          slidetitle: '账号管理',
          group: ['用户管理', '角色管理', '权限管理'],
          rooturl: ['', '', '']
        },
        {
          slidetitle: '接口管理',
          group: ['用户订单', '用户调用记录', '用户接口管理'],
          rooturl: ['', '', '']
        }
      ];
    }
    console.warn('*****************搜索*****************');
  }

  public FnChange(e: Event, ind: number) {
    const nowBtn = e.target as HTMLElement;
    const nowi = nowBtn.querySelector('.fa') as HTMLElement;
    const nowUl = document.querySelectorAll('.user-work-list')[ind] as HTMLElement;
    nowBtn.classList.toggle('change');
    nowUl.classList.toggle('hide');
    nowi.classList.toggle('fa-chevron-up');
    nowi.classList.toggle('fa-chevron-down');
  }

  public GoToContent(childTitle: string, ind: number, x: number): void {
    // tslint:disable-next-line:forin
    for (const i in this.admindatas) {
      this.admindatas[i].rooturl = [];
    }
    this.admindatas[ind].rooturl[x] = 'change';
    switch (childTitle) {
      case '场景(IP白名单)管理':
        this.rooturl = '/user/scene';
        break;
      case '用户管理':
        this.rooturl = '/user/usercontrol';
        break;
      case '角色管理':
        this.rooturl = '/user/rolecontrol';
        break;
      case '权限管理':
        this.rooturl = '/user/authoritycontrol';
        break;
      case '用户接口管理':
        this.rooturl = '/user/interface';
        break;
      default:
    }
    this.router.navigate([this.rooturl]);
  }
}
