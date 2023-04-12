import useProfileBadges from "~/hooks/relay/useProfileBadges";
import { Badge } from "./single";

interface BadgesListProps {
  pubKey: string;
}

export const BadgesList = ({ pubKey }: BadgesListProps) => {
  const { data: badges } = useProfileBadges(pubKey);

  return (
    <div className="mt-2 hidden flex-row justify-center space-x-2">
      {badges.map((badge) => (
        <Badge key={badge.award.id} badge={badge} />
      ))}
    </div>
  );
};

export default BadgesList;
