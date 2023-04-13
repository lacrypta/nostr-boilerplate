import { useContext, useEffect, useState } from "react";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import { OnEose, SubscriptionOptions } from "nostr-relaypool";
import type { Event } from "nostr-tools";
interface UseEventsReturn {
  data: Event[];
  isEose: boolean;
}

interface UseEventsProps {
  authors: string[];
  kinds: number[];
  onEvent?: (event: Event, isAfterEose: boolean, relayURL: string) => void;
  onEose?: OnEose;
  maxDelayms?: number;
  options?: SubscriptionOptions;
}

export const useEvents = ({
  authors,
  kinds,
  onEvent,
  onEose,
  maxDelayms,
  options,
}: UseEventsProps): UseEventsReturn => {
  const { relayUrls, relayPool } = useContext(NostrRelayContext);
  const [data, setData] = useState<Event[]>([]);
  const [isEose, setIsEose] = useState(false);

  useEffect(() => {
    return relayPool.subscribe(
      [
        {
          kinds: kinds,
          authors: authors,
        },
      ],
      relayUrls,
      (event, isAfterEose, relayURL) => {
        onEvent && onEvent(event, isAfterEose, relayURL);
        setData((prev) => [...prev, event]);
      },
      maxDelayms,
      (relayUrl, minCreatedAt) => {
        setIsEose(true);
        onEose && onEose(relayUrl, minCreatedAt);
      },
      options
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data, isEose };
};

export default useEvents;
