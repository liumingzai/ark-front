import Http from '../../../../http';

class SceneService {
  constructor() {
    this.http = new Http();
  }

  /**
   * Get Scene
   *
   * @param {string} uid
   * @memberof SceneService
   */
  getAppWhiteList(uid) {
    const method = 'common/getAppWhiteList';
    return this.http.GET(method, { uid });
  }

  /**
   * 删除场景
   *
   * @param {string} appMd5
   * @param {string} uid
   * @returns
   * @memberof SceneService
   */
  deleteAppWhiteList(appMd5, uid) {
    const method = 'common/deleteAppWhiteList';
    return this.http.DELETE(method, { appMd5, uid });
  }

  /**
   * 更新场景 - admin用户
   *
   * @returns
   * @memberof SceneService
   */
  adminUpdateAppWhiteList(p) {
    const method = 'admin/um/updateAppWhiteList';
    const {
      description, wlContent, active, userToken, uid, appMd5, applicationName,
    } = p;
    return this.http.PUT(method, {
      description,
      wlContent,
      active,
      userToken,
      uid,
      appMd5,
      applicationName,
    });
  }

  /**
   * 更新场景 - API用户
   *
   * @returns
   * @memberof SceneService
   */
  updateAppWhiteList(p) {
    const method = 'common/updateAppWhiteList';
    const {
      description, wlContent, active, uid, appMd5, applicationName,
    } = p;
    return this.http.PUT(method, {
      description,
      wlContent,
      active,
      uid,
      appMd5,
      applicationName,
    });
  }

  /**
   * 新增场景 - API用户
   *
   * @returns
   * @memberof SceneService
   */
  addAppWhiteList(p) {
    const method = 'common/addAppWhiteList';
    const {
      description, wlContent, active, uid, applicationName,
    } = p;
    return this.http.POST(method, {
      description,
      wlContent,
      active,
      uid,
      applicationName,
    });
  }

  /**
   * 新增场景 - Admin
   *
   * @returns
   * @memberof SceneService
   */
  adminAddAppWhiteList(p) {
    const method = 'admin/um/addAppWhiteList';
    const {
      description, wlContent, active, userToken, uid, applicationName,
    } = p;
    return this.http.POST(method, {
      description,
      wlContent,
      active,
      userToken,
      uid,
      applicationName,
    });
  }

  /**
   * generate userToken
   *
   * @returns
   * @memberof SceneService
   */
  getUserToken() {
    const method = 'common/getUserToken';
    return this.http.GET(method);
  }
}

export default SceneService;
