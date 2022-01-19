import { Opaque } from 'type-fest'

export type HogeID = Opaque<number, 'HogeID'>
export const HogeID = {
  from (value: number): HogeID {
    return value as HogeID
  }
}

export class Hoge {
  constructor (
    public readonly id: HogeID,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly title: string,
  ) {}
}
