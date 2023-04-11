import { type AppType } from "next/dist/shared/lib/utils";
import { NostrAccountProvider } from "~/contexts/nostrAccount";
import { WebLNProvider } from "~/contexts/webln";

import "~/styles/globals.css";
import { NostrRelayProvider } from "~/contexts/nostrRelay";

const relayUrls = ["wss://nostr-pub.wellorder.net"];

const NostrApp: AppType = ({ Component, pageProps }) => {
  return (
    <NostrRelayProvider relayUrls={relayUrls}>
      <WebLNProvider>
        <NostrAccountProvider>
          <Component {...pageProps} />
        </NostrAccountProvider>
      </WebLNProvider>
    </NostrRelayProvider>
  );
};

export default NostrApp;
