export class Scene {
  public accountId: number;
  public applicationName: string;
  public description: string;
  public wlContent: string;
  public active: string;
  public appMd5: string;
  public userToken?: string;
  public wlMaxCount?: string;

  constructor() {
    this.accountId = null;
    this.applicationName = null;
    this.description = null;
    this.wlContent = null;
    this.active = null;
    this.appMd5 = null;
  }
}
