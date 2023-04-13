import useBadge from "~/hooks/relay/useBadge";
import type { PreBadge } from "~/types/badge";

interface BadgeProps {
  preBadge: PreBadge;
}

export const Badge = ({ preBadge }: BadgeProps) => {
  const { badge, isLoading } = useBadge({ preBadge });
  console.info("!!!! Badge !!!!");
  console.dir(badge);
  return (
    <div className="inline-block h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-white text-black transition hover:scale-125">
      {isLoading ? (
        "L"
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={badge.definition.description} src={badge.definition.image} />
      )}
    </div>
  );
};
