import { useContext, useEffect, useState } from "react";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import type { Profile } from "~/types/profile";
import { RelayPool } from "nostr-relaypool";
import { Event, Kind } from "nostr-tools";

interface UseProfileReturn {
  data: any[];
}

export const useBadges = (pubKey: string): UseProfileReturn => {
  const { relayUrls } = useContext(NostrRelayContext);
  const [data, setData] = useState<Profile>({ npub: pubKey });
  const [badges, setBadges] = useState<any[]>([]);

  const relayPool = new RelayPool(relayUrls);

  const parseBadge = async (event: Event) => {
    // relayPool.getEventById({id})

    if (
      event.tags.findIndex(
        (tag) => tag[0] === "d" && tag[1] === "profile_badges"
      ) < 0
    ) {
      return null;
    }
  };

  useEffect(() => {
    return relayPool.subscribe(
      [
        {
          kinds: [30008],
          authors: [pubKey],
        },
      ],
      relayUrls,
      (event, isAfterEose, relayURL) => {
        // console.log(event, isAfterEose, relayURL);
        const badge = event;
        setBadges((prev) => [...prev, badge]);
      },
      undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pubKey]);

  return { data: badges };
};

export default useBadges;
