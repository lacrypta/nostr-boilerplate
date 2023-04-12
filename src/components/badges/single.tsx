import type { Badge as BadgeType } from "~/types/badge";

interface BadgeProps {
  badge: BadgeType;
}

export const Badge = ({ badge }: BadgeProps) => {
  console.info("Badge");
  console.dir(badge);
  return (
    <div className="inline-block h-10 w-10 rounded-full bg-white p-2 text-black">
      {badge.isLoading ? "L" : JSON.stringify(badge)}
    </div>
  );
};
