import { useState } from "react";
import type { Event } from "nostr-tools";
import type { PreBadge } from "~/types/badge";
import { extractBadges } from "~/lib/badges";
import useEvents from "./useEvents";

interface UseProfileBadgesReturn {
  data: PreBadge[];
}

export const useProfileBadges = (pubKey: string): UseProfileBadgesReturn => {
  const [badges, setBadges] = useState<PreBadge[]>([]);

  const parseProfileBadges = (event: Event) => {
    const preBadges = extractBadges(event);

    setBadges(preBadges);
  };

  useEvents({
    kinds: [30008],
    authors: [pubKey],
    onEvent: parseProfileBadges,
  });

  return { data: badges };
};

export default useProfileBadges;
