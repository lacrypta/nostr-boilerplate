import { useContext, useEffect, useState } from "react";
import type { Event } from "nostr-tools";
import type { Badge, PreBadge } from "~/types/badge";
import {
  isValidBadge,
  parseBadgeAwardEvent,
  parseBadgeDefinitionEvent,
} from "~/lib/badges";
import { NostrRelayContext } from "~/contexts/nostrRelay";

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
  isValid?: boolean;
}

export const useBadge = ({ preBadge }: UseBadgeProps): UseBadgeReturn => {
  const { relayUrls, relayPool } = useContext(NostrRelayContext);
  const [badge, setBadge] = useState<Badge>();
  const [definitionEvent, setDefinitionEvent] = useState<Event>();
  const [awardEvent, setAwardEvent] = useState<Event>();
  const [isLoadingDefinition, setIsLoadingDefinition] = useState<boolean>(true);
  const [isLoadingAward, setIsLoadingAward] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>();

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
      (event) => {
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

    // Get award event
    void relayPool
      .getEventById(award.id, [...relayUrls, relayUrl], undefined)
      .then((event) => {
        setAwardEvent(event);
      })
      .finally(() => {
        setIsLoadingAward(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When finished loading definition and award
  useEffect(() => {
    // Wait for definition and award to be loaded
    if (isLoadingDefinition || isLoadingAward) {
      return;
    }

    // Set badge object
    const _badge: Badge = {
      definition: parseBadgeDefinitionEvent(definitionEvent),
      award: parseBadgeAwardEvent(awardEvent),
      relayUrl,
    };

    // Validate badge
    isValidBadge(awardEvent, definitionEvent, awardedPubKey)
      .then(() => {
        _badge.valid = true;
        setIsValid(true);
      })
      .catch((e: unknown) => {
        console.info("Badge is not valid!");
        console.dir(e);
        _badge.valid = false;
        setIsValid(false);
      })
      .finally(() => {
        setBadge(_badge);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingDefinition, isLoadingAward]);

  return {
    badge,
    events: { award: awardEvent, definition: definitionEvent },
    isLoadingDefinition,
    isLoadingAward,
    isLoading,
    isValid,
  };
};

export default useBadge;
