import { useContext, useEffect, useState } from "react";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import type { Profile } from "~/types/profile";
import { RelayPool } from "nostr-relaypool";
import { Kind } from "nostr-tools";

interface UseProfileReturn {
  data: Profile;
}

export const useProfile = (pubKey: string): UseProfileReturn => {
  const { relayUrls } = useContext(NostrRelayContext);
  const [data, setData] = useState<Profile>({ npub: pubKey });

  const relayPool = new RelayPool(relayUrls);

  useEffect(() => {
    return relayPool.subscribe(
      [
        {
          kinds: [Kind.Metadata],
          authors: [pubKey],
        },
      ],
      relayUrls,
      (event, isAfterEose, relayURL) => {
        console.log(event, isAfterEose, relayURL);
        setData(JSON.parse(event.content) as Profile);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pubKey]);

  return { data };
};

export default useProfile;
