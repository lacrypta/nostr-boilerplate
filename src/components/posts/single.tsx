import { Event } from "nostr-tools";

interface SinglePostProps {
  event: Event;
}

export const SinglePost = ({ event }: SinglePostProps) => {
  return (
    <div className=" rounded-lg border-black bg-gray-300 p-5 text-base text-black">
      <div>{event.content}</div>
      <div>{event.created_at}</div>
    </div>
  );
};

export default SinglePost;
