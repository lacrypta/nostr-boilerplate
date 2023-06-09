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
  awardedPubKey: string
) => {
  try {
    const parsedDefinition = parseBadgeDefinitionEvent(definitionEvent);
    const parsedAward = parseBadgeAwardEvent(awardEvent);

    // Validate award event interface
    if (!validateEvent(awardEvent)) {
      throw new Error("Award event is invalid");
    }

    // Validate definition event interface
    if (!validateEvent(definitionEvent)) {
      throw new Error("Award event is invalid");
    }

    // Validate match for award and awarded pubkey
    if (!parsedAward.awardedPubKeys.includes(awardedPubKey)) {
      throw new Error("This award is not for you!");
    }

    // Validate match for award and definition pubkeys
    if (awardEvent.pubkey !== definitionEvent.pubkey) {
      throw new Error("Definition and award are not from the same author!");
    }

    // Validate match for award and definition dTag
    if (parsedAward.dTag !== parsedDefinition.dTag) {
      throw new Error("dTag must match between award and definition");
    }

    // Validate award event signature
    if (!verifySignature(awardEvent)) {
      throw new Error("Invalid award signature");
    }

    // Validate definition event signature
    if (!verifySignature(definitionEvent)) {
      throw new Error("Invalid definition signature");
    }
  } catch (e: unknown) {
    return Promise.reject((e as Error).message);
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
  console.dir(event);
  const tags = parseTags(event.tags);
  const [kind, owner, dTag] = tags.a[0][0].split(":");

  return {
    id: event.id,
    created_at: event.created_at,
    kind: event.kind,
    awardedPubKeys: tags.p.map((v) => v[0]),
    dTag,
    definitionKind: parseInt(kind),
    definitionOwner: owner,
  };
};
