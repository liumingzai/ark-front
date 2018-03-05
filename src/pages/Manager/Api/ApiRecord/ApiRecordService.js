import Http from '../../../../http';

class ApiRecordService {
  constructor() {
    this.http = new Http();
  }

  /**
   * For admin
   *
   * @param {any} param
   * @returns
   * @memberof ApiRecordService
   */
  adminGetCountAsscssApi(param) {
    const method = 'admin/api/getCountAsscssApi';
    const {
      page: pageNum, uid, apiName, url, startDate, endDate,
    } = param;

    return this.http.GET(method, {
      pageNum,
      uid,
      apiName,
      url,
      startDate,
      endDate,
    });
  }

  /**
   * For common user
   *
   * @param {any} pageNum
   * @param {any} id
   * @returns
   * @memberof ApiRecordService
   */
  getCountAsscssApi(param, uid) {
    const method = 'common/getCountAsscssApi';
    const {
      page: pageNum, apiName, url, startDate, endDate,
    } = param;
    return this.http.GET(method, {
      pageNum,
      apiName,
      url,
      startDate,
      endDate,
      uid,
    });
  }
}

export default ApiRecordService;
