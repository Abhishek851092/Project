require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const adminCredentials = {
    username: 'admin',
    password: 'Admin@123',
    email: 'admin@portfolio.com'
};

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_admin');
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: adminCredentials.username });
        
        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }
        
        // Create new admin
        const admin = new Admin(adminCredentials);
        await admin.save();
        
        console.log('Admin user created successfully!');
        console.log('Username:', adminCredentials.username);
        console.log('Password:', adminCredentials.password);
        
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        mongoose.connection.close();
    }
}

createAdmin();
