import { OAuth2Client } from 'google-auth-library';
// import client from '../app';


let auth = async function (req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        // const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // if (decoded.expiresAt <= Date.now()) {
        //     return res.status(401).send('Access denied. The token has expired.');
        // }
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}

export default auth;