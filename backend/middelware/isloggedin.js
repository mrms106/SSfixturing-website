

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save the URL they were trying to access
    return res.redirect('/'); // Redirect to login page
  }
  next(); // Proceed to the next middleware or route handler
};
