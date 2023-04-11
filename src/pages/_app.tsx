import { type AppType } from "next/dist/shared/lib/utils";
import { NostrAccountProvider } from "~/contexts/nostrAccount";
import { WebLNProvider } from "~/contexts/webln";

import "~/styles/globals.css";
import { NostrRelayProvider } from "~/contexts/nostrRelay";

const relayUrls = [
  "wss://nostr1.tunnelsats.com",
  "wss://nostr-01.bolt.observer",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr-relay.wlvs.space",
  "wss://nostr.bitcoiner.social",
  "wss://relay.damus.io",
  "wss://relay.nostr.info",
  "wss://relayer.fiatjaf.com",
];

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
