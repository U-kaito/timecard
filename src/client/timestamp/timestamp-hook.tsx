import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { useMemo } from "react"

export interface AttendanceHook {
  
  success: boolean
  error: boolean
}

export function useAttendance(time): AttendanceHook {
  const session = useSession()
  const { mutate, isSuccess, isError } = useMutation(
    async () => {
      const response = await fetch("/api/timestamp/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session.session?.id, time }),
      })

      if (!response.ok) {
        throw new Error("Attendance failed")
      }
    }
  )

  return useMemo(
    () => ({

      success: isSuccess,
      error: isError,
    }),
    [isError, isSuccess, mutate]
  )
}

export interface AttendanceHook {
  
  success: boolean
  error: boolean
}

export function useLeave(time): AttendanceHook {
  const session = useSession()
  const { mutate, isSuccess, isError } = useMutation(
    async () => {
      const response = await fetch("/api/timestamp/leave", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session.session?.id, time }),
      })

      if (!response.ok) {
        throw new Error("Leave failed")
      }
    }
  )

  return useMemo(
    () => ({

      success: isSuccess,
      error: isError,
    }),
    [isError, isSuccess, mutate]
  )
}