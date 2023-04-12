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


/**
 * Create a new Collection
 */
async function createCollection(user, formData){
    

    let monday = (formData.monday === "true") ? true : false;
    let tuesday = (formData.tuesday === "true") ? true : false;
    let wednesday = (formData.wednesday === "true") ? true : false;
    let thursday = (formData.thursday === "true") ? true : false;
    let friday = (formData.friday === "true") ? true : false;
    let saturday = (formData.saturday === "true") ? true : false;
    let sunday = (formData.sunday === "true") ? true : false;
    let morning = (formData.morning === "true") ? true : false;
    let afternoon = (formData.afternoon === "true") ? true : false;
    let evening = (formData.evening === "true") ? true : false;
    const newCollection = {
      title: formData.title,
      days: {
        monday : monday,
        tuesday : tuesday,
        wednesday : wednesday,
        thursday : thursday,
        friday : friday,
        saturday : saturday,
        sunday : sunday,
      },
      time : {
        morning : morning,
        afternoon : afternoon,
        evening : evening
      }
    }
    console.log(user)
    await UserModel.updateOne({ email : user.email}, 
      {$push: {collections: newCollection}});

}

module.exports = { userExists, createUser, createCollection };