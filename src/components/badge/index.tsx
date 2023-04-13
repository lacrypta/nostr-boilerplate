import useBadge from "~/hooks/relay/useBadge";
import type { PreBadge } from "~/types/badge";

interface BadgeProps {
  preBadge: PreBadge;
}

export const Badge = ({ preBadge }: BadgeProps) => {
  const { badge, isLoading, isValid } = useBadge({ preBadge });
  return (
    <div className="relative inline-block">
      <div className="h-10 w-10 overflow-hidden rounded-full bg-white/10 text-black transition hover:scale-125">
        {isLoading ? (
          ""
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={badge.definition.description}
            src={badge.definition.image}
          />
        )}
      </div>
      {isValid === false && (
        <div className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-600 text-sm">
          !
        </div>
      )}
    </div>
  );
};
