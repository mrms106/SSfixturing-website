const rateLimit = require('express-rate-limit');


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
    message: {
        message: "Too many login attempts from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, 
    legacyHeaders: false,
});

const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, 
    message: {
        message: "Too many SignUP attempts from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, 
    legacyHeaders: false,
});

const otpLimiter = rateLimit({
    windowMs: 3 *60 * 60 * 1000, // 15 minutes
    max: 3, 
    message: {
        message: "Too many login attempts from this IP, please try again after 30 minutes"
    },
    standardHeaders: true, 
    legacyHeaders: false,
});


// Export the rate limiter for use in routes
module.exports ={ loginLimiter,signupLimiter,otpLimiter};
