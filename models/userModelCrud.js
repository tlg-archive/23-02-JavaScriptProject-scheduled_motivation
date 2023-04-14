const UserModel = require("./UserModel");

async function userExists(user) {
  let userExists = await UserModel.find({
    email: user.email
  }).exec()
    .then((person) => {
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

  try {
    const person = await newUser.save();
    return person;
  } catch (err) {
    console.error(err);
  }
}


/**
 * Create a new Collection
 */
async function createCollection(user, formData, videoData) {
  let startTime = videoData.start_minutes * 60 + videoData.start_seconds;
  let endTime = videoData.end_minutes * 60 + videoData.end_seconds;

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
  await UserModel.updateOne({ email: user.email },
    { $push: { collections: newCollection } });
}

async function addNewVideo(user, videoData) {
  // make these integers NOT string
  let startTime = videoData.start_minutes * 60 + videoData.start_seconds;
  let endTime = videoData.end_minutes * 60 + videoData.end_seconds;
  const newVideo = {
    url: videoData.url,
    startTime: startTime,
    endTime: endTime
  }

  const newCollectionsArray = user.collections;
  newCollectionsArray.find(collection => collection.title === videoData.collection).videos.push(newVideo);

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


async function updateCollection(userFromDb, collectionTitle, formData){
  const userId = userFromDb._id
  let monday = (formData.monday === 'on') ? true : false;
  let tuesday = (formData.tuesday === 'on') ? true : false;
  let wednesday = (formData.wednesday === 'on') ? true : false;
  let thursday = (formData.thursday === 'on') ? true : false;
  let friday = (formData.friday === 'on') ? true : false;
  let saturday = (formData.saturday === 'on') ? true : false;
  let sunday = (formData.sunday === 'on') ? true : false;
  let morning = (formData.morning === 'on') ? true : false;
  let afternoon = (formData.afternoon === 'on') ? true : false;
  let evening = (formData.evening === 'on') ? true : false;
  let title = formData.title
  UserModel.findOne({ _id: userId })
    .then((user) => {
      const i = user.collections.findIndex(collection => collection.title === collectionTitle);
      user.collections[i].days.monday = monday;
      user.collections[i].days.tuesday = tuesday;
      user.collections[i].days.wednesday = wednesday;
      user.collections[i].days.thursday = thursday;
      user.collections[i].days.friday = friday;
      user.collections[i].days.saturday = saturday;
      user.collections[i].days.sunday = sunday;
      user.collections[i].time.morning = morning;
      user.collections[i].time.afternoon = afternoon;
      user.collections[i].time.evening = evening;
      user.collections[i].title = title;
      return user.save();
    })

}



function deleteCollection(user, title){
  UserModel.findOne({ _id: user._id })
    .then((user) => {
      const collectionIndex = user.collections.findIndex(collection => collection.title === title);
      user.collections.splice(collectionIndex, 1);
      return user.save();
    })
}

module.exports = { 
  userExists, 
  createUser, 
  createCollection, 
  addNewVideo, 
  extractYoutubeVideoId, 
  updateCollection,
  deleteCollection,
 };
