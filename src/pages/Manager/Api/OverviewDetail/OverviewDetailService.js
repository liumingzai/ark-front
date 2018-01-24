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
      publish,
    } = p;
    let {
      errorCodeList,
      paramList,
    } = p;

    errorCodeList = errorCodeList.map((e) => {
      const tmp = {
        errorCode: e.errorCode,
        errorDesc: e.errorDesc,
      };

      if (e.updateTime) {
        tmp.apiErrorCodeId = e.apiErrorCodeId;
      }
      return tmp;
    });

    paramList = paramList.map((e) => {
      const tmp = {
        argumentType: e.argumentType,
        queryColumnDesc: e.queryColumnDesc,
        queryColumnName: e.queryColumnName,
        queryColumnType: e.queryColumnType,
        queryOption: e.queryOption,
      };

      if (e.updateTime) {
        tmp.apiQueryId = e.apiQueryId;
      }
      return tmp;
    });

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
          publish,
        },
      ),
    );
  }
}

export default OverviewDetailService;
