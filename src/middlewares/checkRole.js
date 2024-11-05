const authenticateJWT = require('./authMiddleware');

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    authenticateJWT(req, res, () => {
      if (req.user && allowedRoles.includes(req.user.role)) {
        next();
      } else {
        return res
          .status(403)
          .json({ error: 'Access denied: insufficient permissions' });
      }
    });
  };
};


module.exports = checkRole;
