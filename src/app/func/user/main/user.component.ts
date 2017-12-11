// 专利模块
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { seaData, ListDatas } from '../user-type';

@Component({
  selector: 'ark-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponents implements OnInit {
  public modelClass: string;
  public childtitle: string;
  public noth1: string;
  public noth2: string;
  public noth1root: string;
  public noth2root: string;
  public datasTop: seaData[];
  public noth1query: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.route)
      .subscribe(event => {
        this.PDchildTitle(location.pathname);
      });
  }

  public ngOnInit(): void {
    console.warn('****************标注含义(用于内容区域导航切换)*********************');
    this.route.queryParams.subscribe((params: Params) => {
      this.datasTop = [
        {
          accountId: this.route.snapshot.queryParams['id'],
          uid: this.route.snapshot.queryParams['uid'],
          username: this.route.snapshot.queryParams['username']
        }
      ];
      this.PDchildTitle(location.pathname, this.datasTop[0]);
    });
  }

  // 根据路由地址填充noth1 noth2 childtitle noth1root等值
  public PDchildTitle(pathname: string, obj?: any): void {
    const pathnameArr = pathname.split('/');
    const account = JSON.parse(localStorage.getItem('account'));
    switch (pathnameArr[2]) {
      case 'usercontrol':
        this.noth1 = '用户管理';
        this.childtitle = '用户';
        this.noth1root = '/user/usercontrol';
        break;
      case 'authoritycontrol':
        this.noth1 = '权限管理';
        this.noth1root = '/user/authoritycontrol';
        this.childtitle = '权限';
        break;
      case 'rolecontrol':
        this.noth1 = '角色管理';
        this.noth1root = '/user/rolecontrol';
        this.childtitle = '角色';
        break;
      case 'interface':
        this.noth1 = '接口总览';
        this.noth1root = '/user/interface';
        this.childtitle = '接口';
        break;
      case 'scene':
        this.noth1 = '场景中心';
        this.noth1root = '/user/scene';
        this.childtitle = '场景';
        if (obj && pathname === '/user/scene') {
          localStorage.setItem('noth1query', JSON.stringify(obj));
          this.noth1query = {
            id: obj.accountId,
            uid: obj.uid,
            username: obj.username
          };
        }
    }

    // 此处有疑惑，不知道为何要重置account
    if (pathnameArr.length === 3) {
      localStorage.clear();
      localStorage.setItem('account', JSON.stringify(account));
    }

    // noth2的值是由动作+chilidtitle组成
    if (pathnameArr[3] === 'add') {
      this.noth2 = '新增' + this.childtitle;
    } else if (pathnameArr[3] === 'updata') {
      this.noth2 = '编辑当前' + this.childtitle;
    } else if (pathnameArr[3] === 'detail') {
      this.noth2 = '当前' + this.childtitle;
    } else if (pathnameArr[2] === 'roleauthoritycontrol') {
      this.noth1 = '角色管理';
      this.noth1root = '/user/rolecontrol';
      this.noth2 = '编辑当前角色权限';
    } else {
      this.noth2 = '';
    }
  }
}
