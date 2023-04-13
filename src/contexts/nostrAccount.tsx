import React, { useEffect } from "react";
import useWebLN from "~/hooks/useWebLN";
import type NostrExtensionProvider from "~/types/nostr";

// Global window.nostr
declare global {
  interface Window {
    nostr: NostrExtensionProvider;
  }
}

// NostrAccountContext props
export interface NostrAccountContextProps {
  pubKey?: string;
  nostr?: NostrExtensionProvider;
  login: () => Promise<string | null>;
}

// NostrAccountProvider props
export interface NostrAccountProviderProps {
  children: React.ReactNode;
}

// NostrAccountContext component
export const NostrAccountContext =
  React.createContext<NostrAccountContextProps>({
    login: () => Promise.resolve(null),
  });

// NostrAccountProvider component
export const NostrAccountProvider = ({
  children,
}: NostrAccountProviderProps) => {
  const { connect } = useWebLN();

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
      // Enable webln
      await connect();

      // Enable nostr
      await nostr.enable();

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
    <NostrAccountContext.Provider
      value={{
        pubKey: pubKey,
        nostr,
        login,
      }}
    >
      {children}
    </NostrAccountContext.Provider>
  );
};
