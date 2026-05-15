import { useState } from "react";
import { FormContext } from "./DMSFContext";

export default function useDMSF(HandleNext: () => void) {
  const [contextData, setContextData] = useState<Record<string, any>>();

  const initialContextValues: FormContext = {
    writeData(formValue) {
      setContextData((prev: any) => {
        return { ...prev, ...formValue };
      });
    },

    readData(dataType: string) {
      return contextData?.[dataType];
    },

    onStepFinish() {
      HandleNext();
    },
  };

  return initialContextValues;
}
