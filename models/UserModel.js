const { url } = require('inspector')
const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

// Create the schema:
/**
 * Every user has collections
 * Every collection has title, day bools, time bools, and videos
 * example: get videos for Monday mornings:
 */
const UserSchema = new mongoose.Schema({
    given_name: String,
    family_name: String,
    name: String,
    email: {
        type: String,
        unique: true
    },
    picture: String,
    collections: [{
        title: {
            type: String,
            // required: true
        },
        days: {
            monday: {
                type: Boolean,
                default: false
            },
            tuesday: {
                type: Boolean,
                default: false
            },
            wednesday: {
                type: Boolean,
                default: false
            },
            thursday: {
                type: Boolean,
                default: false
            },
            friday: {
                type: Boolean,
                default: false
            },
            saturday: {
                type: Boolean,
                default: false
            },
            sunday: {
                type: Boolean,
                default: false
            }
        },
        time: {
            morning: {
                type: Boolean,
                default: false
            },
            afternoon: {
                type: Boolean,
                default: false
            },
            evening: {
                type: Boolean,
                default: false
            }
        },
        videos: [{
            url: {
                type: String,
                default: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
            },
            startTime: Number,
            endTime: Number
        }]
    }]
})

module.exports = mongoose.model('users', UserSchema);