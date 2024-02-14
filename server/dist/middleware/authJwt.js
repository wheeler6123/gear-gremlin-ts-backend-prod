"use strict";
// import jwt, { TokenExpiredError } from 'jsonwebtoken';
// import db from '../models';
// import { NextFunction, Request, Response } from 'express';
// import { secret } from '../../config/Auth';
// interface RequestWithUserId extends Request {
//     userId?: string;
// }
// const User = db.user;
// const catchError = (err: any, res: Response) => {
//     if (err instanceof TokenExpiredError) {
//         return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
//     }
//     return res.sendStatus(401).send({ message: 'Unauthorized!' });
// }
// const authJwt = {
//     verifyToken: (req: RequestWithUserId, res: Response, next: NextFunction) => {
//         let token = req.headers['x-access-token'];
//         if (!token) {
//             return res.status(403).send({ message: 'No token provided!' });
//         }
//         if(typeof token === 'string') {
//             jwt.verify(token, secret!, (err: any, decoded: any) => {
//                 if (err) {
//                     return catchError(err, res);
//                 }
//                 req.userId = decoded.id;
//                 next();
//             });
//         } else {
//             return res.status(403).send({ message: 'Failed to authenticate token' });
//         }
//     },
// }
