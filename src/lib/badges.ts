import type { BadgeAward, BadgeDefinition, PreBadge } from "../types/badge";
import { type Event, validateEvent, verifySignature } from "nostr-tools";
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
  awardEvent: Event,
  definitionEvent: Event,
  awardedPubKey
) => {
  const parsedDefinition = parseBadgeDefinitionEvent(definitionEvent);
  const parsedAward = parseBadgeAwardEvent(awardEvent);

  // Validate award event interface
  if (!validateEvent(awardEvent)) {
    return Promise.reject("Award event is invalid");
  }

  // Validate definition event interface
  if (!validateEvent(definitionEvent)) {
    return Promise.reject("Award event is invalid");
  }

  // Validate match for award and awarded pubkey
  if (parsedAward.awardedPubKey !== awardedPubKey) {
    return Promise.reject("This award is not for you!");
  }

  // Validate match for award and definition pubkeys
  if (awardEvent.pubkey !== definitionEvent.pubkey) {
    return Promise.reject("Definition and award are not from the same author!");
  }

  // Validate match for award and definition dTag
  if (parsedAward.dTag !== parsedDefinition.dTag) {
    return Promise.reject("dTag must match between award and definition");
  }

  // Validate award event signature
  if (!verifySignature(awardEvent)) {
    return Promise.reject("Invalid award signature");
  }

  // Validate definition event signature
  if (!verifySignature(definitionEvent)) {
    return Promise.reject("Invalid definition signature");
  }

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
  const [kind, owner, dTag] = tags.a[0][0].split(":");

  return {
    id: event.id,
    created_at: event.created_at,
    kind: event.kind,
    awardedPubKey: tags.p[0][0],
    dTag,
    definitionKind: parseInt(kind),
    definitionOwner: owner,
  };
};
