import { Request, Response } from 'express'
import prisma from '../../../prisma/client'
import { HogeRepository } from "../../../infrastructure/prisma/hoge";

export const getHoge = async (req: Request, res: Response) => {
  const functionName = getHoge.name
  console.info(`[${functionName}] start ${JSON.stringify(req.query)}`)

  try {
    const hogeRepository = new HogeRepository(prisma)
    const params = {
      hoge: req.query.hoge ? String(req.query.genre) : undefined
    }
    const result = await hogeRepository.findMany(params)
    console.info(`[${functionName}] success`)
    return res.status(200).json(result)
  } catch (err) {
    // @ts-ignore
    console.error(`[${functionName}] error ${err.message}`)
    // @ts-ignore
    res.status(500).json({ errorMessage: err.message })
  }
}
