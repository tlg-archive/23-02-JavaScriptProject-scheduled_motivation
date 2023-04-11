const mongoose = require('mongoose')

// Requirements for Mongo:
const MongoClient = require('mongodb').MongoClient
// TODO: We can pass this user name and password through .env to both view our own DB if desired.

// visible password:
const mongoConnection = 'mongodb+srv://visiblePassword:Q66snvk522O4acn0@vacation.1qa4ceh.mongodb.net/scheduled_motivation'
// If we use the env variables:
// const mongoConnection = `mongodb+srv://${MONGOOSE_USERID}:${MONGOOSE_PASSWORD}@${MONGOOSE_CLUSTER_INFO}/scheduled_motivation`
const db = mongoose.connection

// Just to test db connection:
db.once('open', _ => {
    console.log('Database connected: ', mongoConnection)
  })
  db.on('error', err => {
    console.log('Connection error:', err)
  })

  module.exports = {
    db
  }