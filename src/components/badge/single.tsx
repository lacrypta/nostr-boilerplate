import useBadge from "~/hooks/relay/useBadge";
import type { PreBadge } from "~/types/badge";

interface BadgeProps {
  preBadge: PreBadge;
}

export const Badge = ({ preBadge }: BadgeProps) => {
  const { badge } = useBadge({ preBadge });
  console.info("Badge");
  console.dir(badge);
  return (
    <div className="inline-block h-10 w-10 rounded-full bg-white p-2 text-black">
      {badge.isLoading ? "L" : JSON.stringify(badge)}
    </div>
  );
};
