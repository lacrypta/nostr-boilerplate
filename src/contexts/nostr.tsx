import React from "react";
import type NostrExtensionProvider from "~/types/nostr";

// Global window.nostr
declare global {
  interface Window {
    nostr: NostrExtensionProvider;
  }
}

// NostrContext props
export interface NostrContextProps {
  pubKey?: string;
  isEnabled: boolean;
  login: () => Promise<void>;
}

// NostrProvider props
export interface NostrProviderProps {
  children: React.ReactNode;
}

// NostrContext component
export const NostrContext = React.createContext<NostrContextProps>({
  isEnabled: false,
  login: () => Promise.resolve(),
});

// NostrProvider component
export const NostrProvider = ({ children }: NostrProviderProps) => {
  const [pubKey, setPubKey] = React.useState<string | undefined>(undefined);
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

  // Login with Alby extension
  const login = async () => {
    const rpub = await window.nostr.getPublicKey();
    setPubKey(rpub);
    setIsEnabled(window.nostr.enabled);
  };

  return (
    <NostrContext.Provider
      value={{
        pubKey: pubKey,
        isEnabled,
        login,
      }}
    >
      {children}
    </NostrContext.Provider>
  );
};
