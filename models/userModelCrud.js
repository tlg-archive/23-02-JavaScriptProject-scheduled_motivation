const UserModel = require("./UserModel");

async function userExists(user) {
  console.log(user);
  let userExists = await UserModel.find({
    email: user.email
  }).exec()
    .then((person) => {
      console.log("This is what I got from the servier: " + person);
      // userExists = person;
      return (person);
    }).catch((err) => {
      console.error(err);
    });
  if (userExists.length === 0) {
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


/**
 * Create a new Collection
 */
async function createCollection(user, formData, videoData) {
  let startTime = videoData.start - minutes * 60 + videoData.start - seconds;
  let endTime = videoData.end - minutes * 60 + videoData.end - seconds;

  const newVideo = {
    url: videoData.url,
    startTime: startTime,
    endTime: endTime
  }


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
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    },
    time: {
      morning: morning,
      afternoon: afternoon,
      evening: evening
    },
    videos: [newVideo]
  }
  console.log(user)
  await UserModel.updateOne({ email: user.email },
    { $push: { collections: newCollection } });

}

async function addNewVideo(user, formData) {
  let startTime = videoData.start - minutes * 60 + videoData.start - seconds;
  let endTime = videoData.end - minutes * 60 + videoData.end - seconds;
  const newVideo = {
    url: formData.url,
    startTime: startTime,
    endTime: endTime
  }

  const newCollectionsArray = user.collections;
  newCollectionsArray.find(collection => collection.title === formData.collection).videos.push(newVideo);

  await UserModel.updateOne(
    { email: user.email },
    { $set: { collections: newCollectionsArray } }
  );

}

function extractYoutubeVideoId(url) {
  // Regex pattern to match YouTube video ID in URL
  const pattern = /(?:v=)([\w-]{11})(?:&|$)/;

  // Test the URL against the pattern and extract the video ID
  const match = url.match(pattern);
  const videoId = match ? match[1] : null;

  return videoId;
}


module.exports = { userExists, createUser, createCollection, addNewVideo, extractYoutubeVideoId };
