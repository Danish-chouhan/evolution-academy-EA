# Authentication System Setup Guide

## Overview
Evolution Academy now has a complete authentication system with login and registration functionality using Next.js API routes, MongoDB, and JWT tokens.

## Setup Requirements

### 1. Environment Variables (.env.local)
Create a `.env.local` file in the project root:

```
MONGODB_URI=mongodb://localhost:27017/evolution-academy
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. MongoDB Setup Options

#### Option A: Local MongoDB (Development)
- Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
- Start MongoDB service: `mongod`
- Default connection: `mongodb://localhost:27017/evolution-academy`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and database
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/evolution-academy`
4. Update `MONGODB_URI` in `.env.local`

#### Option C: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

## Installation & Setup

### 1. Install Dependencies
All required packages are already installed:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management

### 2. Project Structure
```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts
│   │       └── register/
│   │           └── route.ts
│   └── auth/
│       ├── login/
│       │   └── page.tsx
│       └── register/
│           └── page.tsx
├── components/
│   └── auth/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
└── layout/
    ├── db.ts (Database connection)
    └── models/
        └── User.ts (User schema)
```

## API Endpoints

### Register Endpoint
**POST** `/api/auth/register`

Request body:
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Login Endpoint
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## Frontend Integration

### Login Page
- URL: `/auth/login`
- Component: `LoginForm.tsx`
- Stores JWT token in `localStorage.token`
- Stores user data in `localStorage.user`

### Register Page
- URL: `/auth/register`
- Component: `RegisterForm.tsx`
- Creates new user account
- Auto-logs in after successful registration

## Token Management

### Storing Token
```javascript
localStorage.setItem('token', data.token);
```

### Sending Token with Requests
```javascript
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};
fetch('/api/protected-route', { headers });
```

### Logging Out
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## Future Enhancements

### 1. Protected Routes Middleware
Create middleware to protect API routes that require authentication.

### 2. Logout Endpoint
Create `/api/auth/logout` endpoint.

### 3. Password Reset
Add password reset functionality via email.

### 4. OAuth Integration
Add Google, GitHub login options.

### 5. User Profile Management
Create endpoints for updating user profile.

## Security Best Practices

1. **JWT Secret**: Change `JWT_SECRET` in production to a long, random string
2. **HTTPS**: Use HTTPS in production
3. **CORS**: Configure CORS properly for production domains
4. **Rate Limiting**: Add rate limiting to auth endpoints
5. **Password Validation**: Implement stronger password requirements
6. **Email Verification**: Verify email addresses during registration
7. **Refresh Tokens**: Implement refresh token rotation for enhanced security

## Testing

### Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123",
    "confirmPassword": "Test@123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

## Running the Application

```bash
npm run dev
```

Then visit:
- Login: http://localhost:3000/auth/login
- Register: http://localhost:3000/auth/register

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Verify network connectivity (if using MongoDB Atlas)

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env.local`
- Check token expiration time (currently set to 7 days)

### Password Hash Errors
- Ensure `bcryptjs` is installed: `npm install bcryptjs`
- Check that password is provided in request body

## Hinglish Content
All forms and UI use Hinglish (Roman-script Hindi):
- "Login Karo" = Login
- "Register Karo" = Register
- "Naam" = Name
- "Password" = Password
