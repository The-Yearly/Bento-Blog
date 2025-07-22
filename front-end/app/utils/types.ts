export interface ActivityType {
  image: string;
  desc: string;
  uid: number;
  content: string;
  title: string;
  time: string;
  cont_id: number;
  likes: number;
  fav: string;
  tags: string[];
  user?: {
    name: string;
    image: string;
  };
}
