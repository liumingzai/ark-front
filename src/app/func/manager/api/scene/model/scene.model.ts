export class Scene {
  public accountId: string;
  public appMd5?: string;
  public applicationName: string;
  public description: string;
  public wlContent: string;
  public active: string;
  public userToken?: string;
  public wlMaxCount?: string;

  constructor() {
    this.accountId = null;
    this.applicationName = null;
    this.description = null;
    this.wlContent = null;
    this.active = null;
  }
}
