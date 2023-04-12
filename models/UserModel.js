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
            isMonday: {
                type: Boolean,
                default: false
            },
            isTuesday: {
                type: Boolean,
                default: false
            },
            isWednesday: {
                type: Boolean,
                default: false
            },
            isThursday: {
                type: Boolean,
                default: false
            },
            isFriday: {
                type: Boolean,
                default: false
            },
            isSaturday: {
                type: Boolean,
                default: false
            },
            isSunday: {
                type: Boolean,
                default: false
            }
        },
        time: {
            isMorning: {
                type: Boolean,
                default: false
            },
            isAfternoon: {
                type: Boolean,
                default: false
            },
            isFriday: {
                type: Boolean,
                default: false
            }
        },
        videos: {
            url: {
                type: String,
                default: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
            },
            startTime: Number,
            endTime: Number
        }
    }]
})

module.exports = mongoose.model('users', UserSchema);