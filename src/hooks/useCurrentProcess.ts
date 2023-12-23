import { createContext } from "react";

export type ProcessIdentifier = "description" | "execute-command";

export type CurrentProcessState = {
  currentProcess: ProcessIdentifier;
  setCurrentProcess: (feature: ProcessIdentifier) => void;
};

export const CurrentProcessStateContext = createContext<CurrentProcessState>({
  currentProcess: "description",
  setCurrentProcess: () => {},
});
