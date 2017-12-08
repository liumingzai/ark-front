export class Auth {
  public displayName: string;
  public permissionName: string;
  public path: string;
  public filters: string;
  public description: string;
  public permissionScope: string;
  public active: string;

  constructor() {
    this.displayName = null;
    this.permissionName = null;
    this.path = null;
    this.filters = null;
    this.description = null;
    this.permissionScope = null;
    this.active = null;
  }
}
