import { useContext, useState } from "react";
import type { Event } from "nostr-tools";
import type { Badge, PreBadge } from "~/types/badge";
import { RelayPool } from "nostr-relaypool";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import { buildBadge, extractBadges } from "~/lib/badges";
import useEvents from "./useEvents";

interface UseProfileBadgesReturn {
  data: Badge[];
}

export const useProfileBadges = (pubKey: string): UseProfileBadgesReturn => {
  const { relayUrls } = useContext(NostrRelayContext);
  const relayPool = new RelayPool(relayUrls);
  const [badges, setBadges] = useState<Badge[]>([]);

  const parseProfileBadges = (event: Event) => {
    const preBadges = extractBadges(event);

    setBadges(preBadges as Badge[]);

    preBadges.forEach((_b, k) => {
      void (async (badge: PreBadge, k) => {
        preBadges[k] = await buildBadge(relayPool, relayUrls, badge);
        setBadges(preBadges as Badge[]);
        return;
      })(preBadges[k], k);
    });
  };

  useEvents({
    kinds: [30008],
    authors: [pubKey],
    onEvent: parseProfileBadges,
  });

  return { data: badges };
};

export default useProfileBadges;
