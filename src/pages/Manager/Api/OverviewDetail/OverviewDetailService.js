import Http from '../../../../http';

class OverviewDetailService {
  constructor() {
    this.http = new Http();
  }

  /**
   * Get detail
   *
   * @param {any} apiId
   * @returns
   * @memberof OverviewDetailService
   */
  getApiInfo(apiId) {
    const method = 'common/getApiInfo';
    return this.http.GET(method, { apiId });
  }

  /**
   * update detail
   *
   * @param {any} apiId
   * @param {any} p
   * @returns
   * @memberof OverviewDetailService
   */
  updateApiInfo(apiId, p) {
    const method = 'admin/api/updateApiInfo';
    const {
      accessUrl,
      queryType,
      returnType,
      accessSample,
      returnSample,
      errorCodeList,
      header,
      body,
      query,
    } = p;
    const paramList = Object.assign({}, header, body, query);
    return this.http.PUT(
      method,
      Object.assign(
        {},
        { apiId },
        {
          accessUrl,
          queryType,
          returnType,
          accessSample,
          returnSample,
          errorCodeList,
          paramList,
        },
      ),
    );
  }
}

export default OverviewDetailService;
