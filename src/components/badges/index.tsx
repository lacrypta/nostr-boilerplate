import useBadges from "~/hooks/relay/useBadges";
import { Badge } from "./single";

interface BadgesListProps {
  pubKey: string;
}

export const BadgesList = ({ pubKey }: BadgesListProps) => {
  const { data: events } = useBadges(pubKey);

  return (
    <div className="flex flex-col space-x-4">
      <h2>Badgercitos</h2>
      {events.map((event) => (
        <Badge event={event} />
      ))}
    </div>
  );
};

export default BadgesList;
