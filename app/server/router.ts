import { Router } from 'express'

const router = Router()

/**
 * @param req
 * @param res
 * @param next
 */
// TODO: authenticate
// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   else {
//     res.status(401).send()
//   }
// }

export default router
