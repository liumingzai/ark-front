import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '../../app.service';

@Pipe({ name: 'ImgPathPre' })
export class ImgPathPrePipe implements PipeTransform {
  /**
   * Usage
   * img src="{{logoPath | ImgPathPre}}"
   *
   * @param {string} value
   * @returns {string}
   * @memberof ImgpathPrePipe
   */
  public transform(value: string): string {
    const host = `${window.location.protocol}//${window.location.host}`;
    let prePath = '';
    const appService = new AppService();

    // 不是本地图片需要添加host
    if (!/^\/?asset\/(.)+/.test(value)) {
      prePath += `${appService.base || host}/`;

      // server图片如果没有images前缀，需要加上
      if (!/^images\/(.)*/.test(value)) {
        prePath += 'images/';
      }
    }

    return prePath + value;
  }
}
