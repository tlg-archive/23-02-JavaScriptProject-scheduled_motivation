const UserModel = require("./UserModel");

async function userExists(user) {
  console.log(user);
  let userExists = await UserModel.find({
    email: user.email
  }).exec()
    .then((person) => {
      console.log("This is what I got from the servier: " + person);
      return(person);
    }). catch((err) => {
      console.error(err);
    });

  // let userExists = await UserModel.exists({
  //   email: user.email,
  // });
  return userExists;
}

async function createUser(user) {
  const newUser = new UserModel(user);
  console.log("Trying to create user.  User info:", newUser);

  try {
    const person = await newUser.save();
    console.log("this person was saved to the server: " + person);
    return person;
  } catch (err) {
    console.error(err);
  }

  // return newUser.save()
  //   .then((person) => {
  //     console.log("This person was saved to the server: " + person);
  //     return person;
  //   }). catch((err) => {
  //     console.error(err);
  //   });
}

module.exports = { userExists, createUser };
