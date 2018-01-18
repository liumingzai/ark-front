import Http from '../../../../http';

class OverviewEditService {
  constructor() {
    this.http = new Http();
  }

  /**
   * 新增API - 管理员
   *
   * @param {any} body
   * @returns
   * @memberof OverviewEditService
   */
  addApiOverview(body) {
    const method = 'admin/api/addApiOverview';
    return this.http.POST(method, body);
  }

  /**
   * 修改API - 管理员
   *
   * @param {any} body
   * @returns
   * @memberof OverviewEditService
   */
  updateApiOverview(body) {
    const method = 'admin/api/updateApiOverview';
    return this.http.PUT(method, body);
  }

  /**
   * 获取API概览详情
   *
   * @param {string} apiId
   * @returns
   * @memberof OverviewEditService
   */
  getApiOverView(apiId) {
    const method = 'common/getApiOverviewById';
    return this.http.GET(method, { apiId });
  }
}

export default OverviewEditService;
