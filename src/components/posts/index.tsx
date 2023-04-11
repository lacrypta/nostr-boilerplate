import { useEffect } from "react";
import useEvents from "~/hooks/relay/useEvents";
import SinglePost from "./single";

interface PostsProps {
  pubKey: string;
}

export const Posts = ({ pubKey }: PostsProps) => {
  const { data: events } = useEvents({ authors: [pubKey], kinds: [1] });

  console.dir(events);
  return (
    <div>
      <div className="flex max-w-[500px] flex-col space-y-4 p-5 sm:max-w-[600px] md:max-w-[800px]">
        {events.map((event) => (
          <SinglePost event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
