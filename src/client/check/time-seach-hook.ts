import { useQuery } from "@tanstack/react-query";
import { TimeSearchSchema } from "@/common/time-seach-schema";
import { z } from "zod";
import { useMemo } from "react";
import { TimeStamp } from "@/common/mapper";

export interface TimeSearchHook {
  data: TimeStamp[] | undefined;
  loading: boolean;
}

export function useTimeSeach(year: number, month: number): TimeSearchHook {
  const { data, isLoading } = useQuery(
    ["reservations", { year, month }],
    async () => {
      const response = await fetch(`/api/time-seach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year, month } satisfies z.input<
          typeof TimeSearchSchema
        >),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch reservations: ${response.status} ${response.statusText}`,
        );
      }
      return (await response.json()) as TimeStamp[];
    },
  );

  return useMemo(
    () => ({
      data,
      loading: isLoading,
    }),
    [data, isLoading],
  );
}
