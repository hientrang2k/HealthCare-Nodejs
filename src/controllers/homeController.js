import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let createUserForm = (req, res) => {
  return res.render('createUser.ejs');
};

let postCRUD = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  let data = await CRUDService.getAllUser();
  return res.render('showListUser.ejs', {
    data: data,
  });
};

let getListUser = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render('showListUser.ejs', {
    data: data,
  });
};

let editUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInforById(userId);
    return res.render('editUser.ejs', {
      userData: userData,
    });
  } else {
    return res.send('Not found user!!');
  }
};

let editUserComplete = async (req, res) => {
  let updateData = req.body;
  await CRUDService.updateUser(updateData);
  let allData = await CRUDService.getAllUser();
  return res.render('showListUser.ejs', {
    data: allData,
  });
};

let deleteUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDService.deleteUserById(userId);
    let allData = await CRUDService.getAllUser();
    return res.render('showListUser.ejs', {
      data: allData,
    });
  } else {
    return res.send('Not found user!!');
  }
};

module.exports = {
  getHomePage: getHomePage,
  createUserForm: createUserForm,
  postCRUD: postCRUD,
  getListUser: getListUser,
  editUser: editUser,
  editUserComplete: editUserComplete,
  deleteUser: deleteUser,
};
