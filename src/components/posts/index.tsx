import { useNostrEvents } from "nostr-react";

interface PostsProps {
  pubKey: string;
}

export const Posts = ({ pubKey }: PostsProps) => {
  const { events } = useNostrEvents({
    filter: {
      authors: [pubKey],
      // since: dateToUnix(now.current), // all new events from now
      kinds: [1],
    },
  });

  const sorted = events.sort((a, b) => b.created_at - a.created_at);

  return <div>{JSON.stringify(sorted)}</div>;
};

export default Posts;
