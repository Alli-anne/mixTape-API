const login = (req, res) => {
    res.redirect('/login');
};

const afterLogin = (req, res) => {
  // req.user is available here
  res.redirect('/');
};

const logout = (req, res) => {
   req.logout(function(err) {
     if (err) { return next(err); }
     res.redirect('/users');
   });
};

export { login, afterLogin, logout };