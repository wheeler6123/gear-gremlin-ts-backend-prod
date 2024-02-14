import qs from 'qs';
import { googleClientId, googleClientSecret, googleCallbackUrl } from '../config/Auth.js';
import axios from 'axios';
import User from '../models/User.model.js';
export async function getGoogleOAuthTokens({ code, }) {
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
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return res.data;
    }
    catch (error) {
        console.error('Error fetching Google OAuth tokens: ', error.response.data.error);
        throw new Error('An error occurred while attempting to fetch Google OAuth tokens');
    }
}
export async function getGoogleUser({ id_token, access_token }) {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
    try {
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return res.data;
    }
    catch (error) {
        console.error('Error fetching Google user: ', error.response.data.error);
        throw new Error('An error occurred while attempting to fetch Google user');
    }
}
export async function findAndUpdateUser(query, update, options = {}) {
    return User.findOneAndUpdate(query, update, options);
}
