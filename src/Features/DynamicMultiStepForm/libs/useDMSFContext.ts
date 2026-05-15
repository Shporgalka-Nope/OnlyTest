import { useContext } from "react";
import { DMSFContext } from "./DMSFContext";

export function useDMSFContext() {
  const context = useContext(DMSFContext);

  if (context === undefined) {
    throw new Error("DMSF must be used with initial values");
  }

  return context;
}
