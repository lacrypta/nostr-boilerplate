import React from "react";
import { WebLNContext } from "../contexts/webln";

export const useWebLN = () => {
  const webLNContext = React.useContext(WebLNContext);
  return webLNContext;
};

export default useWebLN;
