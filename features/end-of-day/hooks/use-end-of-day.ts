import { useState } from "react";

import { initialEndOfDay } from "../mock-data";

export function useEndOfDay() {
  const [state, setState] =
    useState(initialEndOfDay);

  return {
    state,

    setUnfinished(value: string) {
      setState((current) => ({
        ...current,
        unfinished: value,
      }));
    },

    setTomorrow(value: string) {
      setState((current) => ({
        ...current,
        tomorrow: value,
      }));
    },

    setProcessFollowed(value: boolean) {
      setState((current) => ({
        ...current,
        processFollowed: value,
      }));
    },
  };
}
