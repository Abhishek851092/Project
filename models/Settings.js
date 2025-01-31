const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    siteTitle: {
        type: String,
        default: 'My Portfolio'
    },
    theme: {
        primaryColor: {
            type: String,
            default: '#007bff'
        },
        secondaryColor: {
            type: String,
            default: '#6c757d'
        },
        backgroundColor: {
            type: String,
            default: '#ffffff'
        },
        fontFamily: {
            type: String,
            default: 'Arial, sans-serif'
        }
    },
    about: {
        title: String,
        description: String,
        image: String
    },
    contact: {
        email: String,
        phone: String,
        address: String
    },
    social: {
        github: String,
        linkedin: String,
        twitter: String,
        instagram: String
    },
    meta: {
        description: String,
        keywords: [String]
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
settingsSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Settings', settingsSchema);
