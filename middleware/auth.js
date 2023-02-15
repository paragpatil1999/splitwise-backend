

let auth = async function (req, res, next) {
    try {
        if (req.session.user == null) {
            return res.status(401).send('Access denied. The token has expired.');
        }
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}

export default auth;