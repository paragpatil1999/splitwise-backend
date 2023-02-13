import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'You have exceeded the 100 requests in 10 mins limit!',
    standardHeaders: true,
    legacyHeaders: false,
});

export default limiter;