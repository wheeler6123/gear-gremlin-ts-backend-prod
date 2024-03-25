    // import { Request, Response, NextFunction } from "express";
    // import db from "../models";
    // const User = db.user;

    // //check duplicate email
    // const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
    //     //check for existing user
    //     User.findOne({
    //         email: req.body.email
    //     }).exec()
    //         .then(user => {
    //             if (user) {
    //                 res.status(400).json({ message: 'User already exists' });
    //                 return;
    //             }
    //             next();
    //         })
    //         .catch(err => {
    //             res.status(500).json({ message: err });
    //             return;
    //         });
    // };

    // const verifySignUp = {
    //     checkDuplicateEmail: checkDuplicateEmail,
    // };

    // export default verifySignUp;

    // check duplicate email function added to auth controller under register method