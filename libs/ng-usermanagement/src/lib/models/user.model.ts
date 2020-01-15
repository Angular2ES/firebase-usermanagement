export class UserModel {
  uid: string;
  age?: string;
  name?: string;
  email?: string;
  groups?: string[];
  adress?: [{
    city?: string;
    country?: string;
    postcode?: string;
    street?: string;
    number?: string;
  }]
}