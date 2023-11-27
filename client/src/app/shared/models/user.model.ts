export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public expiresIn: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public credits: Number,
    public addresses: IAddress[]
  ) {}

  get token() {
    return this._token;
  }
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  recieverFullName: string;
  _id: string;
}
