import Http from '../../../../http';

class SceneService extends Http {
  /**
   * Get Scene
   *
   * @param {any} accountId
   * @memberof SceneService
   */
  getAppWhiteList(accountId) {
    const method = 'common/getAppWhiteList';
    return this.GET(method, { accountId });
  }
}

export default SceneService;
