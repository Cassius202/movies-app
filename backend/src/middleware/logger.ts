/**let's write a function that logs the request and response to the console */

import { Request, Response, NextFunction } from 'express' //for typescript

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next() 
}