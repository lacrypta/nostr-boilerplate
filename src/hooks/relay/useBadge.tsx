import { useContext, useEffect, useState } from "react";
import type { Event } from "nostr-tools";
import type { Badge, PreBadge } from "~/types/badge";
import {
  isValidBadge,
  parseBadgeAwardEvent,
  parseBadgeDefinitionEvent,
} from "~/lib/badges";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import { parseTags } from "~/lib/utils";

interface UseBadgeProps {
  preBadge: PreBadge;
}

interface UseBadgeReturn {
  badge: Badge;
  events: {
    award: Event;
    definition: Event;
  };
  isLoadingDefinition: boolean;
  isLoadingAward: boolean;
  isLoading: boolean;
  valid: boolean;
}

export const useBadge = ({ preBadge }: UseBadgeProps): UseBadgeReturn => {
  const [badge, setBadge] = useState<Badge>();
  const [definitionEvent, setDefinitionEvent] = useState<Event>();
  const [awardEvent, setAwardEvent] = useState<Event>();
  const [isLoadingDefinition, setIsLoadingDefinition] = useState<boolean>(true);
  const [isLoadingAward, setIsLoadingAward] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { relayUrls, relayPool } = useContext(NostrRelayContext);

  const { definition, award, awardedPubKey, relayUrl } = preBadge;

  useEffect(() => {
    // Get replaceable event definition
    void relayPool.subscribe(
      [
        {
          kinds: [definition.kind],
          authors: [definition.author],
          "#d": [preBadge.definition.dTag],
        },
      ],
      relayUrls,
      (event, isAfterEose) => {
        if (!definitionEvent || definitionEvent.created_at < event.created_at) {
          setDefinitionEvent(event);
        }
      },
      undefined, // No delay
      () => {
        // onEose
        setIsLoadingDefinition(false);
      },
      {
        unsubscribeOnEose: true,
      }
    );

    void relayPool
      .getEventById(award.id, [...relayUrls, relayUrl], undefined)
      .then((event) => {
        setAwardEvent(event);
      })
      .finally(() => {
        setIsLoadingAward(false);
      });
  }, []);

  // When finished loading definition and award
  useEffect(() => {
    if (isLoadingDefinition || isLoadingAward) {
      return;
    }

    console.info("******* [ BADGE ] *******");
    console.info("******* Definition *******");
    console.dir(definitionEvent);

    console.info("******* Award *******");
    console.dir(awardEvent);

    console.info("******* Tags *******");
    console.dir(parseTags(definitionEvent.tags));

    const _badge: Badge = {
      definition: parseBadgeDefinitionEvent(definitionEvent),
      award: parseBadgeAwardEvent(awardEvent),
      relayUrl,
    };

    // Validate badge
    isValidBadge(awardEvent, definitionEvent, awardedPubKey)
      .then(() => {
        console.info("VALIDATEDD!!");
        _badge.valid = true;
        setIsValid(true);
      })
      .catch((e) => {
        _badge.valid = false;
        setIsValid(false);
      })
      .finally(() => {
        setBadge(_badge);
        setIsLoading(false);
      });
  }, [isLoadingDefinition, isLoadingAward]);

  return {
    badge,
    events: { award: awardEvent, definition: definitionEvent },
    isLoadingDefinition,
    isLoadingAward,
    isLoading,
    valid: isValid,
  };
};

export default useBadge;
