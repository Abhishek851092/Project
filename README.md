# Portfolio Admin Panel

A comprehensive admin panel for managing your portfolio website.

## Features

- Secure Authentication System
- Dashboard with Statistics
- Project Management
- Media Library
- Website Customization
- Contact Form Management
- Settings Management

## Setup Instructions

1. Install Dependencies:
```bash
npm install
```

2. Configure Environment Variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration

3. Set up MongoDB:
- Install MongoDB if not already installed
- Make sure MongoDB is running on your system

4. Create Admin User:
```bash
node scripts/create-admin.js
```

5. Start the Server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## Access Admin Panel

Visit `http://localhost:5000/admin` and log in with your admin credentials.

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/change-password

### Projects
- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Settings
- GET /api/settings
- PUT /api/settings

### Media
- GET /api/media
- POST /api/media
- DELETE /api/media/:id

### Contact
- GET /api/contact
- PUT /api/contact/:id
- DELETE /api/contact/:id
