const jwt = require('jsonwebtoken');

exports.generateToken = (userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

exports.generateRefreshTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    //sameSite: 'Lax'
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return token;
};
