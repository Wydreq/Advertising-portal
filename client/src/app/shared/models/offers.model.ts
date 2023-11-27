export class OffersRes {
  constructor(
    public susccess: boolean,
    public count: number,
    public pagination: Pagination,
    public data: OfferItem[]
  ) {}
}

export class OfferItem {
  constructor(
    public location: Location,
    public _id: string,
    public name: string,
    public description: string,
    public phone: string,
    public price: number,
    public category: any[],
    public photo: string,
    public negotiate: boolean,
    public user: string,
    public createdAt: Date,
    public slug: string,
    public __v: number,
    public id: string,
    public address: string,
    public offerViews: number,
    public numberViews: number
  ) {}
}

export class Location {
  constructor(
    public type: string,
    public coordinates: number[],
    public formattedAddress: string,
    public street: string,
    public city: string,
    public state: string,
    public zipcode: string,
    public country: string
  ) {}
}

export interface Pagination {}
