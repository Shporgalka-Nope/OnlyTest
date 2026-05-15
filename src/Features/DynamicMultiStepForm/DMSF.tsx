"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ContentVariants } from "./Animations/ContentVariants";
import { DMSFContext } from "./libs/DMSFContext";
import useDMSF from "./libs/useDMSF";
import React from "react";

interface Props {
  children: ReactNode;
  onFinish: () => void;
}

export default function DMSF({ children, onFinish }: Props) {
  const [currentStep, setStep] = useState<number>(0);
  const [animDirection, setAnimDirection] = useState<number>(1); //1 - forwards, 2 - backwards

  const HandleNext = () => {
    if (currentStep === steps.length - 1) {
      onFinish();
      return;
    }
    setAnimDirection(1);
    setStep((prev) => prev + 1);
  };

  const HandlePrev = () => {
    if (currentStep === 0) {
      return;
    }
    setAnimDirection(-1);
    setStep((prev) => prev - 1);
  };

  const steps = React.Children.toArray(children);
  const initialContextValues = useDMSF(HandleNext);

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
