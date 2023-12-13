import { ConfirmSchema } from "@/common/confirm-schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useMemo } from "react";

export interface ConfirmHook {
  confirm(confirmCode: string): void;

  loading: boolean;
  success: boolean;
}

export function useConfirm(key: string): ConfirmHook {
  const { mutate, isLoading, isSuccess } = useMutation(
    async ({ confirmCode }: { confirmCode: string }) => {
      const response = await fetch(`/api/verify/${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmCode,
        } satisfies z.input<typeof ConfirmSchema>),
      });

      if (!response.ok) {
        throw new Error("Failed to verify");
      }
    },
  );

  return useMemo(
    () => ({
      confirm(confirmCode) {
        mutate({ confirmCode });
      },
      loading: isLoading,
      success: isSuccess,
    }),
    [isLoading, isSuccess, mutate],
  );
}
