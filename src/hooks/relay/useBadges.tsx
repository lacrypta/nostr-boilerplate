import { useContext, useState } from "react";
import { Event } from "nostr-tools";
import useEvents from "./useEvents";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import { RelayPool } from "nostr-relaypool";
import { parseBadgeEvents } from "~/lib/badges";

interface UseProfileReturn {
  data: any[];
}

export const useBadges = (pubKey: string): UseProfileReturn => {
  const { relayUrls } = useContext(NostrRelayContext);
  const relayPool = new RelayPool(relayUrls);

  const [badges, setBadges] = useState<any[]>([]);

  const parseProfileBadges = async (event: Event) => {
    const badgeEvents = parseBadgeEvents(event.tags);

    console.info("OHHHHAYYYYEES");
    badgeEvents.forEach(async ({ definition, award }) => {
      console.info("--- BADGE: ---");
      console.info(definition, award);

      console.info("Looking for definition event: ", definition.id);
      try {
        const definitionEvent = await relayPool.getEventById(
          definition.id,
          relayUrls,
          1000
        );

        console.info("definitionEvent: ");
        console.dir(definitionEvent);
        alert(definitionEvent);
      } catch (e) {
        console.info("****** Llegoooo?");
        console.dir(e);
      }

      console.info("Looking for award event: ", award.id);
      const awardEvent = await relayPool.getEventById(
        award.id,
        relayUrls,
        1000
      );

      console.info("awardEvent: ");
      console.dir(awardEvent);
      alert(awardEvent);
    });

    console.info("badgeEvents: ");
    console.dir(badgeEvents);

    setBadges((prev) => [...prev, event]);
  };

  useEvents({ kinds: [30008], authors: [pubKey], onEvent: parseProfileBadges });

  return { data: badges };
};

export default useBadges;
