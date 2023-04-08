import React from "react";
import { NostrContext } from "../contexts/nostr";

export const useNOSTR = () => {
  const nostrContext = React.useContext(NostrContext);
  return nostrContext;
};

export default useNOSTR;
