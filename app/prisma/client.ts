// recommended one instance of PrismaClient
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/#prismaclient-in-long-running-applications
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

// add prisma to the NodeJS global type
// @ts-ignore
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient(/* { log: 'query' } */)

// see
// https://decipher.dev/30-seconds-of-typescript/docs/isPrimitive/
const isPrimitive = (val: unknown) => Object(val) !== val

// see
// https://github.com/prisma/prisma/issues/5051#issuecomment-878106427
// Subtract 9 hours from all the Date objects recursively
const subtract9Hours = (obj: Record<string, unknown>) => {
  if (!obj) { return }

  for (const key of Object.keys(obj)) {
    const val = obj[key]

    if (val instanceof Date) {
      obj[key] = dayjs(val).subtract(9, 'hour').toDate()
    } else if (!isPrimitive(val)) {
      subtract9Hours(val as any)
    }
  }
}

const add9Hours = (data: Record<string, unknown>) => {
  if (!data) { return }

  for (const key of Object.keys(data)) {
    const val = data[key]

    if (val instanceof Date) {
      data[key] = dayjs(val).add(9, 'hour').toDate()
    } else if (!isPrimitive(val)) {
      add9Hours(val as any)
    }
  }
}

function prismaTimeMod<T> (value: T): T {
  if (value instanceof Date) {
    return dayjs(value).subtract(9, 'hour').toDate() as any
  }

  if (isPrimitive(value)) {
    return value
  }

  subtract9Hours(value as any)

  return value
}

prisma.$use(async (params: any, next: any) => {
  switch (params.action) {
    case 'create':
    case 'update':
    case 'upsert':
      add9Hours(params.args.data)
      break
    case 'createMany':
    case 'updateMany':
      for (const record of params.args.data) {
        add9Hours(record)
      }
      break
    default:
      break
  }

  const result = await next(params)
  return prismaTimeMod(result)
})

if (process.env.NODE_ENV === 'development') { global.prisma = prisma }

export default prisma
