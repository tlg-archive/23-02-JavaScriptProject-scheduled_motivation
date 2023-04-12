const UserModel = require("./UserModel");

async function userExists(user) {
  console.log(user);
  let userExists = await UserModel.find({
    email: user.email
  }).exec()
    .then((person) => {
      console.log("This is what I got from the servier: " + person);
      // userExists = person;
      return(person);
    }). catch((err) => {
      console.error(err);
    });
    if(userExists.length === 0) {
      return null;
    } else {
      return userExists[0];
    }

  // return userExists;
}

  // let userExists = await UserModel.exists({
  //   email: user.email,
  // });
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
}

module.exports = { userExists, createUser };
