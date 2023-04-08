import { type AppType } from "next/dist/shared/lib/utils";
import { NostrProvider } from "~/contexts/nostr";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NostrProvider>
      <Component {...pageProps} />
    </NostrProvider>
  );
};

export default MyApp;
