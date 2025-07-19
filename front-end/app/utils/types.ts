export enum ContentEnum {
  Blog,
  Bite,
}
export interface NavItemType {
  name: string;
  link: string;
}

export interface BlogCardType {
  title: string;
  Image: string;
  date: Date;
}

export interface ActivityType {
  image:string;
  desc:string;
  uid: number;
  content: ContentEnum;
  title:string
  time: string;
  cont_id: number;
}
