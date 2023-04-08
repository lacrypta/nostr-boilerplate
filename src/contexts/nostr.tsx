import React, { useEffect } from "react";
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
  nostr?: NostrExtensionProvider;
  login: () => Promise<string | null>;
}

// NostrProvider props
export interface NostrProviderProps {
  children: React.ReactNode;
}

// NostrContext component
export const NostrContext = React.createContext<NostrContextProps>({
  login: () => Promise.resolve(null),
});

// NostrProvider component
export const NostrProvider = ({ children }: NostrProviderProps) => {
  const [pubKey, setPubKey] = React.useState<string | undefined>(undefined);
  const [nostr, setNostr] = React.useState<NostrExtensionProvider | undefined>(
    undefined
  );

  // Login with Alby extension
  const login = async (): Promise<string | null> => {
    if (!nostr) {
      return null;
    }

    try {
      // Enable nostr
      const info = await nostr.enable();
      console.info(info);

      // Get public key
      const _pubKey = await nostr.getPublicKey();

      // Set state variables
      setPubKey(_pubKey);

      // Returns user public key
      return _pubKey;
    } catch (e: unknown) {
      alert("Please approve Alby request");
      console.error("Error while login: ", (e as Error).message);
      return null;
    }
  };

  // Login with Alby extension
  const loadNostr = () => {
    setNostr(window.nostr);
  };

  // Load nostr on mount
  useEffect(() => {
    loadNostr();
  }, []);

  return (
    <NostrContext.Provider
      value={{
        pubKey: pubKey,
        nostr,
        login,
      }}
    >
      {children}
    </NostrContext.Provider>
  );
};
