import { PrismaClient } from '@prisma/client'
import { Hoge, HogeID } from '../../domain/model/hoge'
import { findManyParams, IHogeRepository } from '../../domain/model/hoge/IHogeRepository'

export class HogeRepository implements IHogeRepository {
  constructor (private readonly prisma: PrismaClient) {
  }

  readonly findMany = async (params: findManyParams): Promise<{ hoges?: Hoge[] }> => {
    const rows = await this.prisma.hoge.findMany({})
    console.log(params)

    if (rows == null) {
      throw new Error('hoges is null')
    }

    return { hoges: rows.map(rowToHoge) }
  }
}

export const rowToHoge = (
  row: any
) => {
  if (row.created_at === null) { throw new Error('hoge created_at is null') }
  if (row.updated_at === null) { throw new Error('hoge updated_at is null') }
  if (row.title === null) { throw new Error('hoge title is null') }

  const id = HogeID.from(row.id)

  return new Hoge(
    id,
    row.created_at,
    row.updated_at,
    row.title
  )
}
