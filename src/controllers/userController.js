import db from '../models/index';
import userService from '../services/userService';

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing input parameter!',
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    user: userData.user ? userData.user : {},
    // errCode: 0,
    // email: email,
    // password: password,
  });
};

module.exports = {
  handleLogin: handleLogin,
};