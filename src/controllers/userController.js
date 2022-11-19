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
    userData
  });
};

let getAllUser = async (req, res) => {
  let allUsers = await userService.getAllUser();
  return res.status(200).json({
    errCode: 0,
    message: 'Get all user complete!',
    allUsers
  })
}

let getUserById = async (req, res) => {
  let id = req.query.id; //query: params api
  if (id) {
    let user = await userService.getUserById(id);
    return res.status(200).json({
      errCode: 0,
      message: 'Get user by id complete!',
      user
    })
  } else {
    return res.status(500).json({
      errCode: 3,
      message: "Missing user's id"
    })
  }

}

module.exports = {
  handleLogin: handleLogin,
  getAllUser: getAllUser,
  getUserById: getUserById
};
