import { Role } from '../../role/model/role';

export class User {
  public id: number;
  public uid: string;
  public username: string;
  public phone: string;
  public email: string;
  public state: number;
  public roles: Array<{ id: number; name: string }>;

  constructor() {
    this.uid = null;
    this.username = null;
    this.phone = null;
    this.email = null;
    this.state = null;
    this.roles = [];
  }
}
