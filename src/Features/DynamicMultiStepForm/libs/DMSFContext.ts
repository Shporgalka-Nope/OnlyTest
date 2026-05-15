import { createContext, useContext, useState } from "react";

export interface FormContext {
  writeData: (formValue: Record<string, any>) => void;
  readData: (dataType: string) => any | undefined;
  onStepFinish: () => void;
}

export const DMSFContext = createContext<FormContext>({
  writeData: () => {},
  readData: () => undefined,
  onStepFinish: () => {},
});
