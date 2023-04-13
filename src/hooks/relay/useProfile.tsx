import { useContext, useEffect, useState } from "react";
import { NostrRelayContext } from "~/contexts/nostrRelay";
import type { Profile } from "~/types/profile";
import { Kind } from "nostr-tools";

interface UseProfileReturn {
  data: Profile;
}

export const useProfile = (pubKey: string): UseProfileReturn => {
  const { relayUrls, relayPool } = useContext(NostrRelayContext);
  const [data, setData] = useState<Profile>({ npub: pubKey });

  useEffect(() => {
    return relayPool.subscribe(
      [
        {
          kinds: [Kind.Metadata],
          authors: [pubKey],
        },
      ],
      relayUrls,
      // TODO: Validate Last version of profile
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
