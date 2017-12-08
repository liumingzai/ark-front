export class QueryParam {
    public pageNum: number;
    public username: string;
    public createTimeSort: number;
    public uid: string;
    public state: number;

    constructor() {
      this.pageNum = 1;
      this.username = null;
      this.createTimeSort = 0;
      this.uid = null;
      this.state = 0;
    }
  }
