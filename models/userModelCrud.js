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
    const workingUser = UserModel.findById(user.id);
    let monday = ('monday' in formData.day) ? true : false;
    let tuesday = ('tuesday' in formData.day) ? true : false;
    let wednesday = ('wednesday' in formData.day) ? true : false;
    let thursday = ('thursday' in formData.day) ? true : false;
    let friday = ('friday' in formData.day) ? true : false;
    let saturday = ('saturday' in formData.day) ? true : false;
    let sunday = ('sunday' in formData.day) ? true : false;
    let morning = ('morning' in formData.day) ? true : false;
    let afternoon = ('afternoon' in formData.day) ? true : false;
    let evening = ('evening' in formData.day) ? true : false;

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

    let save = await UserModel.findOneAndUpdate(id = workingUser, workingUser.collections.push(newCollection))
    
}

module.exports = { userExists, createUser };
