import useProfileBadges from "~/hooks/relay/useProfileBadges";
import { Badge } from "./single";

interface BadgesListProps {
  pubKey: string;
}

export const BadgesList = ({ pubKey }: BadgesListProps) => {
  const { data: preBadges } = useProfileBadges(pubKey);

  return (
    <div className="mt-2 hidden flex-row justify-center space-x-2">
      {preBadges.map((badge) => (
        <Badge key={badge.award.id} preBadge={badge} />
      ))}
    </div>
  );
};

export default BadgesList;
