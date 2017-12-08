
export class QueryParam {
  public pageNum: number;
  public createTimeSort: number;
  public active: number;
  public name: string;

  constructor() {
    this.pageNum = 1;
    this.createTimeSort = 0;
    this.active = null;
    this.name = null;
  }
}
