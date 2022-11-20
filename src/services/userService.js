import bcrypt from 'bcryptjs';

const db = require('../models');

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

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

let createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = {};
      let isExist = await checkEmail(data.email);
      if (isExist) {
        user.errCode = 2;
        user.errMessage = "Account is exist!"
        resolve(user)
      }
      let hashPassFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === '1' ? true : false,
        typeRole: data.role,
      });
      user.errCode = 0;
      user.message = "Account is created!"
      resolve(user);

    } catch (e) {
      reject(e);
    }
  })
}

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await db.User.destroy({
          where: { id: id },
        });
        resolve({
          message: 'Delete completed!'
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Account don't exist!"
        });
      }

    } catch (e) {
      reject(e);
    }


  })
}

let updateUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userData.id },
        raw: false,
      });
      if (user) {
        user.email = userData.email;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.address = userData.address;
        user.gender = userData.gender;
        user.typeRole = userData.role;

        await user.save();
        resolve({
          message: "Update user success !"
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Account don't exist!"
        })
      }
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  getUserById: getUserById,
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser
};
