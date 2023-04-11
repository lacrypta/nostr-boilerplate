import useBadges from "~/hooks/relay/useBadges";

interface BadgesListProps {
  pubKey: string;
}

export const BadgesList = ({ pubKey }: BadgesListProps) => {
  const { data } = useBadges(pubKey);

  console.info("CONGUERA!");
  console.dir(data);
  return (
    <div>
      {data.map((badge) => (
        <div>
          Badge
          <div>{JSON.stringify(badge)}</div>
        </div>
      ))}
    </div>
  );
};

export default BadgesList;
