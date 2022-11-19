import bcrypt from 'bcryptjs';

const db = require('../models');

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true, // hien thi data duoi dang object
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'OK';
            delete user.password; //xoa truong password khoi du lieu hien thi ra mh
            userData.user = user;
          } else {
            userData.errCode = 2;
            userData.errMessage = 'Wrong password!';
          }
        }
        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your email is'n exist";
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allUsers = await db.User.findAll({
        attributes: {
          exclude: ['password']
        }
      });
      resolve(allUsers);

    } catch (e) {
      reject(e);
    }
  })
}

let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = ''
      if (id) {
        user = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ['password']
          }
        });
        resolve(user);
      } else {
        resolve(user);
      }
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  getUserById: getUserById
};
