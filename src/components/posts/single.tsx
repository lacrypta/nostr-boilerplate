import moment from "moment";
import type { Event } from "nostr-tools";

interface SinglePostProps {
  event: Event;
}

export const SinglePost = ({ event }: SinglePostProps) => {
  return (
    <div className="rounded-lg border-black bg-gray-300 p-4 text-base text-black">
      <div className="mb-2">{event.content}</div>
      <div className="rounded-md bg-gray-200 p-2 text-xs">
        {moment(event.created_at * 1000).fromNow()}
      </div>
    </div>
  );
};

export default SinglePost;
