import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { TimeStampSchema } from "@/common/timestamp-schema";
import { z } from "zod";
import { User } from "@/common/mapper"
export interface TimeStampHook {
  attend(input: z.input<typeof TimeStampSchema>): void;

  leave(input: z.input<typeof TimeStampSchema>): void;
}

export function useTimeStamp(): TimeStampHook {
  const queryClient = useQueryClient();

  const { mutate: attend } = useMutation(
    async ({ input }: { input: z.input<typeof TimeStampSchema> }) => {
      const response = await fetch(`/api/timestamp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to attend process");
      }

      return (await response.json()) as User
    },
  );

  const { mutate: leave } = useMutation(
    async ({ input }: { input: z.input<typeof TimeStampSchema> }) => {
      const response = await fetch(`/api/timestamp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to leave process");
      }

      return (await response.json()) as User;
    },
  );

  return useMemo(
    () => ({
      attend(input) {
        attend({ input });
      },
      leave(input) {
        leave({ input });
      },
    }),
    [attend, leave],
  );
}
