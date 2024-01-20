import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import RefreshToken from '../models/RefreshToken.model';
import { secret, jwtExpiration } from '../../config/Auth';
import { getGoogleOAuthTokens, getGoogleUser, findAndUpdateUser } from '../services/user.service';

interface GoogleTokensResult {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

//create controller 
const UserController = {
    //create user
    register: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        console.log('register request received: ', email, password);
        try {
            //validate
            if (!email || !password) {
                return res.status(400).json({ message: 'Please enter all fields' });
            }

            //check for existing user
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            //validate password
            const isStrongPassword = (password: string): boolean => {
                // At least 8 characters long
                if (password.length < 8) return false;

                // Contains both lowercase and uppercase characters
                if (!(/[a-z]/.test(password) && /[A-Z]/.test(password))) return false;

                // Contains at least one number
                if (!/[0-9]/.test(password)) return false;

                // Contains at least one special character
                if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) return false;

                return true;
            };
            
            //hash the password
            let hashedPassword: string;
            if (!isStrongPassword(password)) {
                return res.status(400).json({ message: 'Password is invalid, password must be at least 8 characters in length and contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
            } else {
                hashedPassword = bcrypt.hashSync(password, 10);
            }
            
            //create new user
            const newUser = new User({ email, password: hashedPassword });
            
            await newUser.save();
            
            res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
            console.error('Error during registration: ', error);
            res.status(500).json({ message: 'An error occurred while processing your request' });
        }
    },

    //login user
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            //find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            
            //check password
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            
            //create access token
            const token = jwt.sign({ id: user._id }, secret!, {
                expiresIn: jwtExpiration,
            });
            
            //create refresh token
            const refreshToken = await RefreshToken.createToken(user._id);
            
            res.status(200).json({ token, refreshToken, id: user._id });
        } catch (error) {
            console.error('Error during login: ', error);
            res.status(500).json({ message: 'An error occurred while attempting to login' });
        }
    },

    //logout user
    logout: async (req: Request, res: Response) => {
        const refreshToken = req.body.token;

        //delete refresh token from db
        try {
            await RefreshToken.findOneAndDelete({ token: refreshToken });
            res.status(200).json({ message: 'Logout successful' });
        } catch (error: any) {
            console.error('Error during logout: ', error);
            res.status(500).json({ message: 'An error occurred while attempting to logout' });
        }
            
    },

    //change password
    changePassword: async (req: Request, res: Response) => {
        try {
            const { userId, newPassword } = req.body;

            //find user by id
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // //check old password
            // const isMatch = bcrypt.compareSync(oldPassword, user.password);
            // if (!isMatch) {
            //     return res.status(400).json({ message: 'Invalid password' });
            // }

            //validate new password
            const isStrongPassword = (password: string): boolean => {
                // At least 8 characters long
                if (password.length < 8) return false;

                // Contains both lowercase and uppercase characters
                if (!(/[a-z]/.test(password) && /[A-Z]/.test(password))) return false;

                // Contains at least one number
                if (!/[0-9]/.test(password)) return false;

                // Contains at least one special character
                if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) return false;

                return true;
            };

            if (!isStrongPassword(newPassword)) {
                return res.status(400).json({ message: 'Password is invalid, password must be at least 8 characters in length and contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
            } 

            //hash new password
            const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

            //codeupdate user in database
            user.password = hashedNewPassword;
            await user.save();

            res.status(200).json({ message: 'Password changed successfully' });

        } catch (error: any) {
            console.error('Error during password change: ', error);
            res.status(500).json({ message: 'An error occurred while attempting to process your password change request' });
        }
            
    },

    //google Oauth login
    googleOauthLogin: async (req: Request, res: Response) => {
        //get code client request
        const code = req.query.code as string;
        
        try {
            //get the id and access token with the code
            const { id_token, access_token } = await getGoogleOAuthTokens({code});
            console.log({ id_token, access_token });

            //get user with tokens
            const googleUser = await getGoogleUser({ id_token, access_token });
            console.log({ googleUser });

            //upsert user
            const user = await findAndUpdateUser({ 
                email: googleUser.email 
            }, { 
                email: googleUser.email,
                name: googleUser.name,
            }, {
                upsert: true,
                new: true
            });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            
            //create access token
            const accessToken = jwt.sign({ id: user._id }, secret!, {
                expiresIn: jwtExpiration,
            });

            //create refresh token
            const refreshToken = await RefreshToken.createToken(user._id);
            res.status(200).json({ accessToken, refreshToken, id: user._id });

           

        } catch (error: any) {
            console.error('Error during Google OAuth login: ', error);
            res.status(500).json({ message: 'An error occurred while attempting to login with Google' });
        }
    }
        
};

export default UserController;

