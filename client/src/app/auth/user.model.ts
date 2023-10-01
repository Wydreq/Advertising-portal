export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public expiresIn: string,
    public firstName: string,
    public lastName: string,
    public role: string
  ) {}

  get token() {
    return this._token;
  }
}
