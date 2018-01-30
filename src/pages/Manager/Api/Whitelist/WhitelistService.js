import Http from '../../../../http';

class WhitelistService {
  constructor() {
    this.http = new Http();
  }

  /**
   * 管理员-白名单访问统计记录
   *
   * @param {any} p
   * @returns
   * @memberof WhitelistService
   */
  getSummaryWhiteListLog(p) {
    const method = '/admin/api/getSummaryWhiteListLog';
    const {
      page: pageNum, uid, apiName, clientIp, url, dailyDate,
    } = p;

    return this.http.GET(method, {
      pageNum,
      uid,
      apiName,
      clientIp,
      url,
      dailyDate,
    });
  }
}

export default WhitelistService;
