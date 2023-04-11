import { type AppType } from "next/dist/shared/lib/utils";
import { NostrAccountProvider } from "~/contexts/nostrAccount";
import { WebLNProvider } from "~/contexts/webln";

import { NostrProvider } from "nostr-react";

import "~/styles/globals.css";

const relayUrls = ["wss://nostr-pub.wellorder.net", "wss://relay.nostr.ch"];

const NostrApp: AppType = ({ Component, pageProps }) => {
  return (
    <NostrProvider relayUrls={relayUrls}>
      <WebLNProvider>
        <NostrAccountProvider>
          <Component {...pageProps} />
        </NostrAccountProvider>
      </WebLNProvider>
    </NostrProvider>
  );
};

export default NostrApp;
