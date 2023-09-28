export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public expiresIn: string
  ) {}

  get token() {
    return this._token;
  }
}
