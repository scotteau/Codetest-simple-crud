export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Item {
  post: Post;
  user: User;
  album: Album;
}


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
