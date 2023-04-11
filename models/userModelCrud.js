const UserModel = require("./UserModel");

async function userExists(user) {
  console.log(user);
  let userExists = await UserModel.exists({
    email: user.email,
  });
  return userExists;
}

async function createUser(user) {
  const newUser = new UserModel(user);
  console.log("Trying to create user.  User info:", newUser);
  await newUser.save();
}

module.exports = { userExists, createUser };
