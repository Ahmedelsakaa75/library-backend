export const isAdmin = (req, res, next) => {
    // Check if user exists and has admin role
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Admin role required to access this route'
      });
    }
  };