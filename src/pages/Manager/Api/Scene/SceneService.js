import Http from '../../../../http';

class SceneService {
  constructor() {
    this.http = new Http();
  }

  /**
   * Get Scene
   *
   * @param {string} accountId
   * @memberof SceneService
   */
  getAppWhiteList(accountId) {
    const method = 'common/getAppWhiteList';
    return this.http.GET(method, { accountId });
  }

  /**
   * 删除场景
   *
   * @param {string} appMd5
   * @param {string} accountId
   * @returns
   * @memberof SceneService
   */
  deleteAppWhiteList(appMd5, accountId) {
    const method = 'common/deleteAppWhiteList';
    return this.http.DELETE(method, { appMd5, accountId });
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
      description, wlContent, active, userToken, accountId, appMd5, applicationName,
    } = p;
    return this.http.PUT(method, {
      description,
      wlContent,
      active,
      userToken,
      accountId,
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
      description, wlContent, active, accountId, appMd5, applicationName,
    } = p;
    return this.http.PUT(method, {
      description,
      wlContent,
      active,
      accountId,
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
      description, wlContent, active, accountId, applicationName,
    } = p;
    return this.http.POST(method, {
      description,
      wlContent,
      active,
      accountId,
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
      description, wlContent, active, userToken, accountId, applicationName,
    } = p;
    return this.http.POST(method, {
      description,
      wlContent,
      active,
      userToken,
      accountId,
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
    const method = 'admin/um/getUserToken';
    return this.http.GET(method);
  }
}

export default SceneService;
