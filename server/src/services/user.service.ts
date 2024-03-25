import qs from 'qs';
import { googleClientId, googleClientSecret, googleCallbackUrl } from '../../config/Auth';
import axios from 'axios';
import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import User, { IUser } from '../models/User.model';

interface GoogleTokensResult {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export async function getGoogleOAuthTokens ({
    code,
}: {
    code: string;
}): Promise<GoogleTokensResult> {
    const url = 'https://oauth2.googleapis.com/token';

    const values = {
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: googleCallbackUrl,
        grant_type: 'authorization_code',
    };
    console.log('values: ', values);
    try {
        console.log('fetching Google OAuth tokens');
        console.log('url: ', url);
        const res = await axios.post<GoogleTokensResult>(
            url,
            qs.stringify(values),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return res.data;
    } catch (error: any) {
        console.error('Error fetching Google OAuth tokens: ', error.response.data.error);
        throw new Error('An error occurred while attempting to fetch Google OAuth tokens');
    }
}

interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export async function getGoogleUser ({id_token, access_token}: {id_token: string, access_token: string}): Promise<GoogleUserResult> {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

    try {
        const res = await axios.get<GoogleUserResult>(url, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return res.data;
    } catch (error: any) {
        console.error('Error fetching Google user: ', error.response.data.error);
        throw new Error('An error occurred while attempting to fetch Google user');
    }
}

export async function findAndUpdateUser(query: FilterQuery<IUser>, 
    update: UpdateQuery<IUser>, 
    options: QueryOptions = {}){
        return User.findOneAndUpdate(query, update, options);
}