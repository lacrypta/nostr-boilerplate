import useProfileBadges from "~/hooks/relay/useProfileBadges";
import { Badge } from ".";

interface BadgesListProps {
  pubKey: string;
}

export const BadgesList = ({ pubKey }: BadgesListProps) => {
  const { data: preBadges } = useProfileBadges(pubKey);

  return (
    <div className="mt-4 flex flex-row justify-center space-x-4">
      {preBadges.map((badge) => (
        <Badge key={badge.award.id} preBadge={badge} />
      ))}
    </div>
  );
};

export default BadgesList;
