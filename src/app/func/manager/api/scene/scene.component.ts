import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SceneService } from './scene.service';
import { Account } from '../../../../account.model';
import { Scene, QueryParam } from './model';
import { SnackBar } from '../../../../tool/snackbar';
import swal from 'sweetalert2';

@Component({
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [SceneService]
})
export class SceneComponent implements OnInit {
  private userId: number; // 用户ID
  public scenes: Scene[];
  public scene: Scene;
  public queryParam: QueryParam;
  private maxCount: number;
  public userType: number;
  public isEditing: boolean;
  public canEdit: boolean;
  public adminCanEdit: boolean;

  constructor(
    private sceneService: SceneService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBar
  ) {
    this.scene = new Scene();
    this.queryParam = new QueryParam();
    this.userId = this.getUserId();

    const id = this.route.snapshot.queryParams['accountId'];
    this.scene.accountId = id ? id : this.userId;

    this.getAppWhiteList();
    this.getAppMaxCount();
  }

  ngOnInit() {}

  /**
   * 新增场景
   *
   * @memberof SceneComponent
   */
  public addNewScene() {
    if (this.validateMaxCount()) {
      this.isEditing = true;
      this.scene = new Scene();
      if (this.userType === 1) {
        this.adminCanEdit = true;
      } else {
        this.canEdit = true;
      }
    } else {
      this.snackBar.warning('您已经达到了最大场景数量，不能继续添加场景');
    }
  }

  private validateMaxCount(): boolean {
    return this.scenes.length >= this.maxCount ? false : true;
  }

  public onSubmit() {
    const type: 'add' | 'update' = this.scene.appMd5 ? 'update' : 'add';
    this.scene.accountId = this.userId;

    if ('add' === type) {
      if (this.userType === 1) {
        this.adminAddAppWhiteList();
      } else {
        this.addAppWhiteList();
      }
    } else if ('update' === type) {
      if (this.userType === 1) {
        this.adminUpdateAppWhiteList();
      } else {
        this.updateAppWhiteList();
      }
    }
  }

  public onDelete() {
    swal({
      title: '您确定要删除吗？',
      text: '该操作将彻底删除，并且不能恢复!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#dc3545',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(result => {
      if (result.value) {
        this.deleteAppWhiteList();
      } else if (result.dismiss === 'cancel') {
      }
    });
  }

  private initRouterListener() {
    this.route.queryParams.subscribe((params: Params) => {
      const { id = null, creator = null, accountId = null } = params;
      this.queryParam = { id, creator, accountId };
    });
  }

  private getUserId(): number {
    const account: Account = JSON.parse(localStorage.getItem('account'));
    this.userType = account.userType;
    return account.id;
  }

  /**
   * 退出新增，返回到场景管理
   *
   * @memberof SceneComponent
   */
  public goBack() {
    this.isEditing = false;
    this.scene = this.scenes[0];
  }

  /**
   * 获取场景
   *
   * @private
   * @memberof SceneComponent
   */
  private getAppWhiteList() {
    this.sceneService.getAppWhiteList(this.scene.accountId).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.scenes = data.data;
        this.scene = this.scenes[0];
      }
    });
  }

  /**
   * 获取场景最大数量
   *
   * @private
   * @memberof SceneComponent
   */
  private getAppMaxCount() {
    this.sceneService.getAppMaxCount().subscribe((data: any) => {
      if ('2000' === data.code) {
        this.maxCount = +data.data;
      }
    });
  }

  /**
   * API用户 - 添加场景
   *
   * @private
   * @memberof SceneComponent
   */
  private addAppWhiteList() {
    this.sceneService.addAppWhiteList(this.scene).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('新增成功');

        this.getAppMaxCount();
        this.getAppWhiteList();
        this.isEditing = false;
      }
    });
  }

  /**
   * 管理员 - 添加场景
   *
   * @private
   * @memberof SceneComponent
   */
  private adminAddAppWhiteList() {
    this.sceneService.adminAddAppWhiteList(this.scene).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('新增成功');

        this.getAppMaxCount();
        this.getAppWhiteList();
        this.isEditing = false;
      }
    });
  }

  /**
   * API用户 - 更新场景
   *
   * @private
   * @memberof SceneComponent
   */
  private updateAppWhiteList() {
    this.sceneService.updateAppWhiteList(this.scene).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('更新成功');
      }
    });
  }

  /**
   * 管理员 - 更新场景
   *
   * @private
   * @memberof SceneComponent
   */
  private adminUpdateAppWhiteList() {
    this.sceneService.adminUpdateAppWhiteList(this.scene).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('更新成功');
      }
    });
  }

  /**
   * 删除场景
   *
   * @private
   * @memberof SceneComponent
   */
  private deleteAppWhiteList() {
    this.sceneService.deleteAppWhiteList(this.scene.appMd5, this.scene.accountId).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('删除成功');
        this.getAppWhiteList();
      }
    });
  }
}
