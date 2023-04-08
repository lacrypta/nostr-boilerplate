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
  isEnabled: boolean;
  nostr?: NostrExtensionProvider;
  login: () => Promise<string | null>;
}

// NostrProvider props
export interface NostrProviderProps {
  children: React.ReactNode;
}

// NostrContext component
export const NostrContext = React.createContext<NostrContextProps>({
  isEnabled: false,
  login: () => Promise.resolve(null),
});

// NostrProvider component
export const NostrProvider = ({ children }: NostrProviderProps) => {
  const [pubKey, setPubKey] = React.useState<string | undefined>(undefined);
  const [nostr, setNostr] = React.useState<NostrExtensionProvider | undefined>(
    undefined
  );
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

  // Login with Alby extension
  const login = async (): Promise<string | null> => {
    if (!nostr) {
      return null;
    }

    try {
      // Request extension to login
      const _pubKey = await nostr.getPublicKey();

      // Set state variables
      setPubKey(_pubKey);
      setIsEnabled(nostr.enabled);

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
    setIsEnabled(window.nostr.enabled);
  };

  // Load nostr on mount
  useEffect(() => {
    loadNostr();
  }, []);

  return (
    <NostrContext.Provider
      value={{
        pubKey: pubKey,
        isEnabled,
        nostr,
        login,
      }}
    >
      {children}
    </NostrContext.Provider>
  );
};
