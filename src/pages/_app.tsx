import { type AppType } from "next/dist/shared/lib/utils";
import { NostrAccountProvider } from "~/contexts/nostr";
import { WebLNProvider } from "~/contexts/webln";

import "~/styles/globals.css";

const NostrApp: AppType = ({ Component, pageProps }) => {
  return (
      <WebLNProvider>
        <NostrAccountProvider>
          <Component {...pageProps} />
        </NostrAccountProvider>
      </WebLNProvider>
  );
};

export default NostrApp;
