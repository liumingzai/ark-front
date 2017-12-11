import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, Params } from '@angular/router';

import swal from 'sweetalert2';
import { UserService } from './service/user.service';
import { QueryParam } from './model/';
import { SnackBar } from '../../../../tool/snackbar';
import { flyInOutAnimation } from '../../../../tool/animation';

@Component({
  templateUrl: './user.component.html',
  animations: [flyInOutAnimation],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public users: any[];
  public queryParam: QueryParam;

  constructor(
    private userService: UserService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private snackbar: SnackBar
  ) {
    this.queryParam = new QueryParam();
  }

  public ngOnInit() {
    this.activedRoute.queryParams.subscribe((params: Params) => {
      this.queryParam.pageNum = Number(params['pageNum']) || 1;
      this.queryParam.username = params['username'] || null;
      this.queryParam.createTimeSort = Number(params['createTimeSort']) || 0;
      this.queryParam.state = params['state'] || null;
      this.queryParam.uid = params['uid'] || null;
      this.currentPage = this.queryParam.pageNum;
      this.getAccountList();
    });
  }

  /**
   * 翻页
   * @param paginator
   */
  public paginate(paginator: any) {
    const pageNum = paginator.page + 1;
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        pageNum
      }
    };
    this.router.navigate([], navigationExtras);
  }

  /**
   * 按照用户名查询
   * @param key
   */
  public onSearch(username: string) {
    this.router.navigate(['./'], {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        username,
        pageNum: 1
      }
    });
  }

  /**
   * 过滤用户状态
   * @param State
   */
  public onChangeState(state: number): void {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        pageNum: 1,
        state
      }
    };
    this.router.navigate([], navigationExtras);
  }

  /**
   * 按创建时间排序
   */
  public onChangeSort() {
    const createTimeSort = this.queryParam.createTimeSort === 0 ? 1 : 0;
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        createTimeSort
      }
    };
    this.router.navigate([], navigationExtras);
  }

  /**
   * 删除用户
   * @param uid
   */
  public onUserDelete(id: number) {
    swal({
      title: '您确定要删除吗？',
      text: '该操作将彻底删除，并且不能恢复!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0069d9',
      cancelButtonColor: '#868e96',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(
      () => {
        this.deletePerson(id);
      },
      (dismiss: string) => {
        if (dismiss === 'cancel') {
          // do antion cancel
        }
      }
    );
  }

  /**
   * 获取用户列表
   * @private
   * @param {QueryParam} queryParam
   * @memberof UserComponent
   */
  private getAccountList() {
    console.warn(this.queryParam);
    this.userService.getAccountList(this.queryParam).subscribe((data: any) => {
      if (data && '2000' === data.code) {
        this.users = data.data;
        this.totalRecords = data.size;
      }
    });
  }

  /**
   * 删除用户
   *
   * @private
   * @param {number} id
   * @memberof UserComponent
   */
  private deletePerson(id: number) {
    this.userService.deleteAccount(id).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.success('删除用户成功');
        this.getAccountList();
      }
    });
  }
}
