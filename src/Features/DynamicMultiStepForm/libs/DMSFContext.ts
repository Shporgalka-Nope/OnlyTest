import { createContext } from "react";

export interface FormContext {
  writeData: (formValue: Record<string, any>) => void;
  readData: Record<string, any> | undefined;
  onStepFinish: () => void;
  onStepReverse: () => void;
}

export const DMSFContext = createContext<FormContext>({
  writeData: () => {},
  readData: {},
  onStepFinish: () => {},
  onStepReverse: () => {},
});
