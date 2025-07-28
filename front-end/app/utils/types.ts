export interface ActivityType {
  image?: string;
  desc: string;
  uid?: number;
  content: string;
  title: string;
  time?: string;
  cont_id?: number;
  likes: number;
  fav: boolean;
  tags: string[];
  User?: {
    name: string;
    image: string;
  };
}
