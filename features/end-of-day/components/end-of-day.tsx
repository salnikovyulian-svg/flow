"use client";

import { useState } from "react";

import { saveEndOfDay } from "../actions/save-end-of-day";

import { ShutdownLayout } from "./shutdown-layout";
import { ShutdownProgress } from "./shutdown-progress";
import { StepFinish } from "./step-finish";
import { StepOpenLoops } from "./step-open-loops";
import { StepSystem } from "./step-system";
import { StepTomorrow } from "./step-tomorrow";

export function EndOfDayScreen() {
  const [step, setStep] = useState(1);

  const [openLoops, setOpenLoops] =
    useState("");

  const [tomorrow, setTomorrow] =
    useState("");

  const [trustedSystem, setTrustedSystem] =
    useState(false);

  async function finish() {
    await saveEndOfDay({
      unfinished: openLoops,
      tomorrow,
      processFollowed:
        trustedSystem,
    });
  }

  return (
    <ShutdownLayout step={step}>

      <ShutdownProgress step={step} />

      {step === 1 && (
        <StepOpenLoops
          value={openLoops}
          onChange={setOpenLoops}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepTomorrow
          value={tomorrow}
          onChange={setTomorrow}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <StepSystem
          value={trustedSystem}
          onChange={setTrustedSystem}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <StepFinish
          onBack={() => setStep(3)}
          onFinish={finish}
        />
      )}

    </ShutdownLayout>
  );
}
