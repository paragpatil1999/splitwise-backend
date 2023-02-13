import express from 'express';
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send({
        message: 'Welcome to the API',
        status: 'success',
        data: {
            IP: req.ip,
            reqesterUserAgent: req.headers['user-agent'],
            reqesterAccept: req.headers['accept'],
            reqesterAcceptLanguage: req.headers['accept-language'],
            reqesterAcceptEncoding: req.headers['accept-encoding'],
            reqesterAcceptCharset: req.headers['accept-charset'],
            reqesterAcceptEncoding: req.headers['accept-encoding']
        }
    });
});

export default router;