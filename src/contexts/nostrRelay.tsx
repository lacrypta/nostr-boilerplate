import { RelayPool } from "nostr-relaypool";
import React, { useEffect, useState } from "react";

// NostrRelayContext props
export interface NostrRelayContextProps {
  relayUrls: string[];
  relayPool?: RelayPool;
}

// NostrRelayProvider props
export interface NostrRelayProviderProps {
  relayUrls?: string[];
  children: React.ReactNode;
}

// NostrRelayContext component
export const NostrRelayContext = React.createContext<NostrRelayContextProps>({
  relayUrls: [],
});

// NostrRelayProvider component
export const NostrRelayProvider = ({
  children,
  relayUrls = [],
}: NostrRelayProviderProps) => {
  const [relayPool, setRelayPool] = useState<RelayPool>();
  useEffect(() => {
    setRelayPool(new RelayPool(relayUrls));
  }, [relayUrls]);

  return (
    <NostrRelayContext.Provider value={{ relayUrls, relayPool }}>
      {children}
    </NostrRelayContext.Provider>
  );
};
