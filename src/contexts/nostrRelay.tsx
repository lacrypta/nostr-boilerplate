import React from "react";

// NostrRelayContext props
export interface NostrRelayContextProps {
  relayUrls: string[];
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
  return (
    <NostrRelayContext.Provider value={{ relayUrls }}>
      {children}
    </NostrRelayContext.Provider>
  );
};
