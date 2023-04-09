import { useNostrEvents } from "nostr-react";

export const Posts = ({ pubKey }) => {
  const { events } = useNostrEvents({
    filter: {
      authors: [pubKey],
      //   since: dateToUnix(now.current), // all new events from now
      kinds: [0],
    },
  });

  const sorted = events.sort((a, b) => b.created_at - a.created_at);

  console.info("Brought user");
  console.dir(events);

  return <div>{JSON.stringify(events)}</div>;
};

export default Posts;
