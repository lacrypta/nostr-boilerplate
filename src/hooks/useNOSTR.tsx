import React from "react";
import { NostrAccountContext } from "../contexts/nostrAccount";

export const useNOSTR = () => {
  const nostrContext = React.useContext(NostrAccountContext);
  return nostrContext;
};

export default useNOSTR;
