import {
    User as PrismaUser,
    TimeStamp as PrismaTimeStamp,
  } from "@/common/prisma"

export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
}

export interface TimeStamp {
    id: number
    day: number
    startTime: Date
    finishTime: Date | null
    startPlace: string
    finishPlace: string | null
}

export function mapTimeStamp(
    timeStamp: PrismaTimeStamp,
  ): TimeStamp {
    const day = new Date(timeStamp.startTime).getDate()
    return {
      id: timeStamp.id,
      day: day,
      startTime: timeStamp.startTime,
      finishTime: timeStamp.finishTime,
      startPlace: timeStamp.startPlace,
      finishPlace: timeStamp.finishPlace,
    }
  }
  