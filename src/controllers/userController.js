import db from '../models/index';
import userService from '../services/userService';

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(200).json({
      errCode: 1,
      message: 'Missing input parameter!',
    });
  } else {
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
      user: userData.user ? userData.user : {},
      userData
    });
  }

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
    return res.status(200).json({
      errCode: 3,
      errMessage: "Missing user's id"
    })
  }

}

let createUser = async (req, res) => {
  if (!req.body.email) {
    return res.status(200).json({
      errCode: 406,
      errMessage: "Missing user's email"
    })
  } else {
    let user = await userService.createUser(req.body);
    return res.status(200).json(user)
  }

}

let deleteUser = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 406,
      errMessage: "Choose user want to delete"
    })
  } else {
    let user = await userService.deleteUser(req.query.id);
    return res.status(200).json(user)
  }

}

let updateUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 406,
      errMessage: "Missing user's id"
    })
  } else {
    let user = await userService.updateUser(req.body);
    return res.status(200).json(user)
  }

}

module.exports = {
  handleLogin: handleLogin,
  getAllUser: getAllUser,
  getUserById: getUserById,
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser
};
