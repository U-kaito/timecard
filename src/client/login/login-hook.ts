import { LoginSchema } from "@/common/login-schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useMemo } from "react";

export interface LoginHook {
  login(email: string, password: string): void;

  loading: boolean;
  success: boolean;
  error: boolean;
}

export function useLogin(): LoginHook {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password } satisfies z.input<
          typeof LoginSchema
        >),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
    },
  );

  return useMemo(
    () => ({
      login(email, password) {
        mutate({ email, password });
      },
      loading: isLoading,
      success: isSuccess,
      error: isError,
    }),
    [isError, isLoading, isSuccess, mutate],
  );
}
