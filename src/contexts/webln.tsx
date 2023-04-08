import type {
  GetInfoResponse,
  WebLNProvider as WebLNExtensionProvider,
} from "@webbtc/webln-types";
import React, { useEffect } from "react";

// WebLNContext props
export interface WebLNContextProps {
  isEnabled: boolean;
  webln?: WebLNExtensionProvider;
  info?: GetInfoResponse;
  connect: () => Promise<GetInfoResponse | null>;
}

// WebLNProvider props
export interface WebLNProviderProps {
  children: React.ReactNode;
}

// WebLNContext component
export const WebLNContext = React.createContext<WebLNContextProps>({
  isEnabled: false,
  connect: () => Promise.resolve(null),
});

// WebLNProvider component
export const WebLNProvider = ({ children }: WebLNProviderProps) => {
  const [webln, setWebLN] = React.useState<WebLNExtensionProvider | undefined>(
    undefined
  );
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<GetInfoResponse>();

  // Login with Alby extension
  const connect = async (): Promise<GetInfoResponse | null> => {
    if (!webln) {
      return null;
    }

    try {
      // Request extension to connect
      const { enabled } = await webln.enable();

      // Set state variables
      setIsEnabled(enabled);

      // Returns user public key
      return await webln.getInfo();
    } catch (e: unknown) {
      alert("Please approve Alby request");
      console.error("Error while connect: ", (e as Error).message);
      return null;
    }
  };

  // Login with Alby extension
  const loadWebLN = async () => {
    setWebLN(window.webln);
    const info = await window.webln?.getInfo();
    setInfo(info);
  };

  // Load nostr on mount
  useEffect(() => {
    void loadWebLN();
  }, []);

  return (
    <WebLNContext.Provider
      value={{
        isEnabled,
        webln,
        info,
        connect,
      }}
    >
      {children}
    </WebLNContext.Provider>
  );
};
