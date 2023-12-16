import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
export interface TimeStampHook {
  attend(date: Date): void;

  leave(date: Date): void;
}

export function useTimeStamp(): TimeStampHook {
  const queryClient = useQueryClient();

  const { mutate: attend } = useMutation(async (date: Date) => {
    const response = await fetch(`/api/timestamp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    });

    if (!response.ok) {
      throw new Error("Failed to attend process");
    }

    // return (await response.json()) as Date
  });

  const { mutate: leave } = useMutation(async (date: Date) => {
    const response = await fetch(`/api/timestamp`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    });

    if (!response.ok) {
      throw new Error("Failed to leave process");
    }

    return (await response.json()) as Date;
  });

  return useMemo(
    () => ({
      attend(date) {
        attend(date);
      },
      leave(date) {
        leave(date);
      },
    }),
    [attend, leave],
  );
}
