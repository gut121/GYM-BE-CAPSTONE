const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message : "Too many requests from this IP, please try again after 15 minutes."
});

exports.limiterAuth = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5,
  message : "Too many requests from this IP, please try again after 60s."
});

