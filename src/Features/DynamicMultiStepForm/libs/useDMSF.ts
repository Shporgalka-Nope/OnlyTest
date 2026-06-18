import { useState } from "react";
import { FormContext } from "./DMSFContext";

interface Props {
  HandleNext: () => void;
  HandleReverse: () => void;
  id: string;
}

export default function useDMSF({ HandleNext, HandleReverse }: Props) {
  const [contextData, setContextData] = useState<Record<string, any>>();

  const initialContextValues: FormContext = {
    readData: contextData,

    writeData(formValue) {
      setContextData((prev: any) => {
        return { ...prev, ...formValue };
      });
    },

    onStepFinish() {
      HandleNext();
    },

    onStepReverse() {
      HandleReverse();
    },
  };

  return initialContextValues;
}
