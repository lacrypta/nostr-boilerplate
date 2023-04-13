import type { PreBadge } from "../types/badge";
import type { Event } from "nostr-tools";

export const extractBadges = (event: Event): PreBadge[] => {
  const tags = event.tags;
  const badgeEvents: PreBadge[] = [];

  for (let i = 0; i < tags.length; i++) {
    if (tags[i][0] === "a" && tags[i + 1][0] === "e") {
      const [kind, author, dTag] = tags[i][1].split(":");
      const [, awardId, relayUrl] = tags[i + 1];
      badgeEvents.push({
        definition: {
          author,
          dTag,
          kind: parseInt(kind),
        },
        award: {
          id: awardId,
        },
        relayUrl,
        awardedPubKey: event.pubkey,
        isLoading: true,
      });
    }
  }

  return badgeEvents;
};
