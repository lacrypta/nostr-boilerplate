import { useContext, useEffect, useState } from "react";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import { RelayPool } from "nostr-relaypool";
import { Event } from "nostr-tools";
interface UseEventsReturn {
  data: Event[];
}

interface UseEventsProps {
  authors: string[];
  kinds: number[];
  onEvent?: (event: Event, isAfterEose: boolean, relayURL: string) => void;
}

export const useEvents = ({
  authors,
  kinds,
  onEvent,
}: UseEventsProps): UseEventsReturn => {
  const { relayUrls } = useContext(NostrRelayContext);
  const [data, setData] = useState<Event[]>([]);

  const relayPool = new RelayPool(relayUrls);

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
      }
    );
  }, []);
  return { data };
};

export default useEvents;
