import type { BadgeAward, BadgeDefinition, PreBadge } from "../types/badge";
import type { Event } from "nostr-tools";
import { parseTags } from "./utils";

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
      });
    }
  }

  return badgeEvents;
};

export const isValidBadge = async (
  _awardEvent: Event,
  _definitionEvent: Event,
  _awardedPubKey
) => {
  return Promise.resolve(true);
};

export const parseBadgeDefinitionEvent = (event: Event): BadgeDefinition => {
  const tags = parseTags(event.tags);

  return {
    author: event.pubkey,
    id: event.id,
    kind: event.kind,
    description: tags.description[0][0],
    dTag: tags.d[0][0],
    image: tags.image[0][0],
    name: tags.name[0][0],
    thumb: tags.thumb[0][0],
  };
};

export const parseBadgeAwardEvent = (event: Event): BadgeAward => {
  const tags = parseTags(event.tags);

  return {
    id: event.id,
    created_at: event.created_at,
    kind: event.kind,
    awardedPubKey: tags.p[0][0],
  };
};
