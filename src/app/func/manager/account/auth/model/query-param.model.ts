export class QueryParam {
  public pageNum: number;
  public key: string;
  public stype: string;
  public active: number;
  public permissionName: string;
  public path: string;
  public createTimeSort: number;

  constructor() {
    this.pageNum = 1;
    this.key = null;
    this.createTimeSort = null;
    this.active = null;
    this.path = null;
    this.permissionName = null;
    this.stype = 'name';
  }
}
