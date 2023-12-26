import {
  User as PrismaUser,
  TimeStamp as PrismaTimeStamp,
} from "@/common/prisma";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  owner: boolean;
  work: boolean;
}

export interface TimeStamp {
  id: number;
  day: number;
  startTime: Date;
  finishTime: Date | null;
  startPlace: string;
  finishPlace: string | null;
}

export function mapUser(
  user: PrismaUser,
  timeStamp: PrismaTimeStamp | undefined,
): User {
  let work = false;
  if (timeStamp) {
    work = true;
  }
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    owner: user.owner,
    work: work,
  };
}

export function mapTimeStamp(timeStamp: PrismaTimeStamp): TimeStamp {
  const day = new Date(timeStamp.startTime).getDate();
  return {
    id: timeStamp.id,
    day: day,
    startTime: timeStamp.startTime,
    finishTime: timeStamp.finishTime,
    startPlace: timeStamp.startPlace,
    finishPlace: timeStamp.finishPlace,
  };
}
