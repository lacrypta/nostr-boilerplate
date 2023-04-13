import useBadge from "~/hooks/relay/useBadge";
import type { PreBadge } from "~/types/badge";

interface BadgeProps {
  preBadge: PreBadge;
}

export const Badge = ({ preBadge }: BadgeProps) => {
  const { badge, isLoading } = useBadge({ preBadge });
  return (
    <div className="inline-block h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-white/10 text-black transition hover:scale-125">
      {isLoading ? (
        ""
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={badge.definition.description} src={badge.definition.image} />
      )}
    </div>
  );
};
