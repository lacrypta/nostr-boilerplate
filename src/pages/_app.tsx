import { type AppType } from "next/dist/shared/lib/utils";
import { NostrProvider } from "~/contexts/nostr";
import { WebLNProvider } from "~/contexts/webln";

import "~/styles/globals.css";

const NostrApp: AppType = ({ Component, pageProps }) => {
  return (
    <WebLNProvider>
      <NostrProvider>
        <Component {...pageProps} />
      </NostrProvider>
    </WebLNProvider>
  );
};

export default NostrApp;
