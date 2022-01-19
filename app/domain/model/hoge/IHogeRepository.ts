import { Hoge, HogeID } from './hoge'

export type findManyParams = {
  hoge?: string
}

export interface IHogeRepository {
  findMany(params: findManyParams): Promise<{ hoges?: Hoge[] }>
}
