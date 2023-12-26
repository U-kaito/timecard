
import { useMutation, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { EmployeeAddSchema } from "@/common/employee-schema"
import { User } from "@/common/mapper"
import { z } from "zod"

export interface EmployeeHook {
  employees: (User)[]

  addEmployee(firstName: string, lastName: string, email: string, password: string, owner: boolean): void
}

export function useEmployees(): EmployeeHook {
  const { data } = useQuery(["employees"],
    async () => {
      const response = await fetch("/api/employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      return (await response.json()) as (User)[]
    }
  )

  const { mutateAsync } = useMutation(
    async ({ firstName, lastName, email, password, owner }: { firstName: string; lastName: string; email: string; password: string; owner: boolean }) => {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          owner,
        } satisfies z.input<typeof EmployeeAddSchema>),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      return (await response.json())
    }
  )

  return useMemo(
    () => ({
      employees: data ?? [],
      addEmployee(firstName, lastName, email, password, owner) {
        return mutateAsync({ firstName, lastName, email, password, owner })
      },
    }),
    [data, mutateAsync]
  )
}
