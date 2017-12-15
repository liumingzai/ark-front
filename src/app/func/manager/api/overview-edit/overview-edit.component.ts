import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OverviewEditService } from './overview-edit.service';
import { API } from './api.model';
import { SnackBar } from '../../../../tool/snackbar';
import { NgxCropperOption } from 'ngx-cropper';
import { AppService } from '../../../../app.service';

interface Status {
  id: number;
  title: string;
}

@Component({
  selector: 'overview-edit',
  templateUrl: './overview-edit.component.html',
  styleUrls: ['./overview-edit.component.scss'],
  providers: [OverviewEditService]
})
export class OverviewEditComponent implements OnInit {
  public cats: string[];
  public api: API;
  private statusList: Array<Status>;
  public status: Status;
  private canSubmit: boolean = true;
  public ngxCropperConfig: NgxCropperOption;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private overviewEditService: OverviewEditService,
    private snackBar: SnackBar,
    private appService: AppService
  ) {
    this.cats = ['企业', '专利', '工商', '其他'];
    this.api = new API();

    this.statusList = [
      {
        id: 0,
        title: '新增接口'
      },
      {
        id: 1,
        title: '修改接口'
      }
    ];

    const params = this.route.snapshot.queryParams;
    if (params && params['id']) {
      this.status = this.statusList[1];
      this.api.apiId = params['id'];
    } else {
      this.status = this.statusList[0];
    }
  }

  ngOnInit() {
    this.ngxCropperConfig = {
      url: `${this.appService.baseURL}/common/addUploadPicture?entity=interface`, // image server url
      maxsize: 512000, // image max size, default 500k = 512000bit
      title: '调整您的图片的位置和大小', // edit modal title, this is default
      uploadBtnName: '选择图片', // default Upload Image
      uploadBtnClass: null, // default bootstrap styles, btn btn-primary
      cancelBtnName: '取消', // default Cancel
      cancelBtnClass: null, // default bootstrap styles, btn btn-default
      applyBtnName: '应用', // default Apply
      applyBtnClass: null, // default bootstrap styles, btn btn-primary
      fdName: 'upload', // default 'file', this is  Content-Disposition: form-data; name="file"; filename="fire.jpg"
      aspectRatio: 1 / 1, // default 1 / 1, for example: 16 / 9, 4 / 3 ...
      viewMode: 1 // default 0, value can be 0, 1, 2, 3
    };
  }

  public save() {
    if (this.canSubmit) {
      if (this.validateNotNull(this.api)) {
        if (this.status.id) {
          this.editAPI();
        } else {
          this.addAPI();
        }
      } else {
        this.snackBar.warning('请您补全提交信息');
      }
    } else {
      this.snackBar.warning('正在提交，请稍候');
    }
  }

  // deal callback data
  public onReturnData(data: any) {
    data = JSON.parse(data);
    if (data && data.code === 2000 && data.data.code === '2000') {
      this.snackBar.success('Logo更新成功');
      this.api.apiPic = data.data.message;
    } else if (data) {
      if (data.code === 4002) {
        this.snackBar.warning('您只能选择图片格式的文件');
      } else if (data.code === 4000) {
        this.snackBar.warning(`您上传的图片超过了最大值300k, 当前${data.data}k`);
      } else if (data.code === 4001) {
        this.snackBar.warning('保存失败');
      }
    }
  }

  /**
   * 校验 对象值不能为空
   *
   * @private
   * @param {{}} params
   * @returns {boolean}
   * @memberof OverviewEditComponent
   */
  private validateNotNull(params: {}): boolean {
    return Object.values(params).every((e: any) => e !== null);
  }

  private addAPI() {
    this.overviewEditService.addApiOverview(this.api).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('新增成功');
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      }
    });
  }

  private editAPI() {
    this.overviewEditService.updateApiOverview(this.api).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackBar.success('编辑成功');
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      }
    });
  }
}
