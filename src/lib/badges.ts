import type { RelayPool } from "nostr-relaypool";
import type { Badge, PreBadge } from "../types/badge";
import type { Event } from "nostr-tools";

export const extractBadges = (event: Event): PreBadge[] => {
  const tags = event.tags;
  const badgeEvents: PreBadge[] = [];

  for (let i = 0; i < tags.length; i++) {
    if (tags[i][0] === "a" && tags[i + 1][0] === "e") {
      const splitted = tags[i][1].split(":");
      badgeEvents.push({
        award: {
          id: splitted[1],
          dTag: splitted[2],
        },
        definition: { id: tags[i + 1][1] },
        awardedPubKey: event.pubkey,
        isLoading: true,
      });
    }
  }

  return badgeEvents;
};

export const buildBadge = async (
  relayPool: RelayPool,
  relayUrls: string[],
  preBadge: PreBadge
): Promise<Badge> => {
  const { definition, award, awardedPubKey } = preBadge;

  console.info("**** Building Badge ****", definition.id);

  console.info("Looking for definition event: ", definition.id);
  const definitionEvent = await relayPool.getEventById(
    definition.id,
    relayUrls,
    300
  );

  console.info("definitionEvent: ");
  console.dir(definitionEvent);

  console.info("Looking for award event: ", award.id);
  const awardEvent = await relayPool.getEventById(award.id, relayUrls, 300);

  console.info("awardEvent: ");
  console.dir(awardEvent);

  return {
    award: { id: award.id, created_at: new Date(), dTag: award.dTag },
    definition: {
      id: definition.id,
      description: "Description",
      image: "src....",
      owner: "owner",
    },
    awardedPubKey,
    isLoading: false,
    valid: true,
  };
};
