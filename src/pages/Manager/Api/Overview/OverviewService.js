import Http from '../../../../http';

class OverviewService {
  constructor() {
    this.http = new Http();
  }

  /**
   * CommonUser 获取接口概览
   *
   * @param {any} param
   * @returns
   * @memberof OverviewService
   */
  getApiOverview(param) {
    const method = 'common/getApiOverview';
    const {
      page: pageNum, key: apiName, cat: apiCategory, sort: createTimeSort,
    } = param;

    return this.http.GET(method, {
      pageNum,
      apiName,
      apiCategory,
      createTimeSort,
    });
  }

  /**
   * 获取接口概览 - Admin
   *
   * @param {any} param
   * @returns
   * @memberof OverviewService
   */
  adminGetApiOverview(param) {
    const method = 'admin/api/getApiOverview';
    const {
      page: pageNum, key: apiName, cat: apiCategory, sort: createTimeSort, publish,
    } = param;
    return this.http.GET(method, {
      pageNum,
      apiName,
      apiCategory,
      createTimeSort,
      publish,
    });
  }

  /**
   * 删除API - admin用户
   *
   * @param {any} apiId
   * @returns
   * @memberof OverviewService
   */
  deleteApi(apiId) {
    const method = 'admin/api/deleteApi';
    return this.http.DELETE(method, { apiId });
  }
}

export default OverviewService;
