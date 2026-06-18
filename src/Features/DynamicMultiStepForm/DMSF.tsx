import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ContentVariants } from "./Animations/ContentVariants";
import { DMSFContext } from "./libs/DMSFContext";
import useDMSF from "./libs/useDMSF";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/state/useStoreHooks";
import { setDmsfStep } from "./libs/dmsfSlice";

interface Props {
  children: ReactNode;
  onFinish: () => void;
  id: string;
  persist?: boolean;
}

export default function DMSF({
  children,
  onFinish,
  id,
  persist = false,
}: Props) {
  const dispatch = useAppDispatch();
  const sessionStep = useAppSelector((state) =>
    state.session.dmsfState.find((s) => s.id === id),
  );
  const [currentStep, setStep] = useState<number>(
    sessionStep?.currentStep || 0,
  );
  useEffect(() => {
    setStep(sessionStep?.currentStep || 0);
  }, [sessionStep]);

  const [animDirection, setAnimDirection] = useState<number>(1); //1 - forwards, 2 - backwards

  const HandleNext = () => {
    if (currentStep === steps.length - 1) {
      onFinish();
      return;
    }
    setAnimDirection(1);
    const newStep = currentStep + 1;
    setStep(newStep);
    if (persist) dispatch(setDmsfStep({ id: id, currentStep: newStep }));
  };

  const HandlePrev = () => {
    if (currentStep === 0) {
      return;
    }
    setAnimDirection(-1);
    const newStep = currentStep - 1;
    setStep(newStep);
    if (persist) dispatch(setDmsfStep({ id: id, currentStep: newStep }));
  };

  const steps = React.Children.toArray(children);
  const initialContextValues = useDMSF({
    HandleNext: HandleNext,
    HandleReverse: HandlePrev,
    id,
  });

  return (
    <div className="w-100 h-100 overflow-x-hidden p-4">
      <DMSFContext.Provider value={initialContextValues}>
        {
          <div className="d-flex flex-column h-100 w-100">
            <AnimatePresence mode="wait" custom={animDirection}>
              <motion.div
                variants={ContentVariants}
                custom={animDirection}
                initial="initial"
                animate="show"
                exit="exit"
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
                key={currentStep}
              >
                {steps[currentStep]}
              </motion.div>
            </AnimatePresence>
          </div>
        }
      </DMSFContext.Provider>
    </div>
  );
}
