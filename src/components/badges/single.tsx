import { Event } from "nostr-tools";

interface BadgeProps {
  event: Event;
}

export const Badge = ({ event }: BadgeProps) => {
  console.info("Badge");
  console.dir(event);
  return <div className="inline-block h-14 w-14 rounded-full bg-white"></div>;
};
