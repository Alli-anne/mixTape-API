const login = (req, res) => {
    res.redirect('/login');
};

const afterLogin = (req, res) => {
  // req.user is available here
  res.redirect('/users');
};

const logout = (req, res) => {
   req.logout(function(err) {
     if (err) { return next(err); }
     res.redirect('/logout');
   });
};

export { login, afterLogin, logout };