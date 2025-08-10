import axios from "axios";
import { ActivityType } from "./types";
export async function LikeAction(content: ActivityType, liked: boolean) {
  if (liked) {
    content.likes = content.likes - 1;
  } else {
    content.likes = content.likes + 1;
  }
  const rea = axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/updateLike",
    content,
  );
}
