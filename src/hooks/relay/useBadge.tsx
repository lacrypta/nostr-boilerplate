import { useContext, useEffect, useState } from "react";
import { Badge, PreBadge } from "~/types/badge";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import { Event } from "nostr-tools";

interface UseBadgeProps {
  preBadge: PreBadge;
}

interface UseBadgeReturn {
  badge: Badge;
}

export const useBadge = ({ preBadge }: UseBadgeProps): UseBadgeReturn => {
  const [badge, setBadge] = useState<Badge>(preBadge as Badge);
  const [definitionEvent, setDefinitionEvent] = useState<Event>();
  const [isLoadingDefinition, setIsLoadingDefinition] = useState<boolean>(true);
  const [isLoadingAward, setIsLoadingAward] = useState<boolean>(true);
  const { relayUrls, relayPool } = useContext(NostrRelayContext);

  const { definition, award, awardedPubKey, relayUrl } = preBadge;

  console.info("Looking for definition replaceable event...");

  useEffect(() => {
    // Get replaceable event definition
    relayPool.subscribe(
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
          if (isAfterEose) {
            setIsLoadingDefinition(false);
          }
        }
      },
      undefined,
      undefined,
      {
        unsubscribeOnEose: true,
      }
    );

    console.info("definitionEvent: ");
    console.dir(definitionEvent);

    console.info("Looking for award event...");

    void relayPool
      .getEventById(award.id, [relayUrl], undefined)
      .then((event) => {
        setIsLoadingAward(false);
        if (!event || (event.kind as number) !== 8) {
          badge.award.valid = false;
          return;
        }

        badge.award.created_at = event.created_at;
        badge.award.valid = true;
      });
  }, []);

  useEffect(() => {
    console.info("******* Definition EVENT *******");
    console.dir(definitionEvent);
  }, [definitionEvent]);

  //   relayPool.subscribe(
  //     [
  //       {
  //         kinds: [definition.kind],
  //         authors: [definition.author],
  //       },
  //     ],
  //     relayUrls,
  //     (event, isAfterEose) => {
  //       if (!definitionEvent || definitionEvent.created_at < event.created_at) {
  //         setDefinitionEvent(event);
  //         if (isAfterEose) {
  //           setIsLoadingDefinition(false);
  //         }
  //       }
  //     },
  //     undefined,
  //     undefined,
  //     {
  //       unsubscribeOnEose: true,
  //     }
  //   );

  return { badge };
};

export default useBadge;
