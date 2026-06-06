# Quick Start Guide - Authentication Testing

## Prerequisites
1. Node.js installed
2. MongoDB running (local or Atlas)
3. `.env.local` file configured

## Quick Setup Steps

### 1. Install Dependencies (if not done)
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/evolution-academy
JWT_SECRET=dev-secret-key-change-in-production
```

### 3. Start MongoDB (if using local)
```bash
mongod
```

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Testing Authentication

### Step 1: Visit Registration Page
- Go to: http://localhost:3000/auth/register
- Click "Login Karo" button if already registered

### Step 2: Register New Account
- Fill in:
  - **Naam**: Your Name
  - **Email**: test@example.com
  - **Password**: Test@123
  - **Confirm Password**: Test@123
- Click **Register Karo**
- You should see "Registration successful! Login karte hain..."
- Will auto-redirect to home page

### Step 3: Verify Token Storage
Open browser console (F12):
```javascript
// Check if token is stored
localStorage.getItem('token')

// Check if user data is stored
localStorage.getItem('user')
```

### Step 4: Test Login After Logout
- Manually clear localStorage:
  ```javascript
  localStorage.clear()
  ```
- Go to http://localhost:3000/auth/login
- Enter your email and password
- Click **Login Karo**
- Should redirect to home and store token

### Step 5: API Testing with Curl

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test123@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test123@example.com",
    "password": "TestPass123"
  }'
```

## Features Implemented

✅ User Registration with email validation
✅ Password hashing with bcryptjs
✅ User Login with JWT token generation
✅ Form validation and error messages
✅ Token storage in localStorage
✅ Hinglish UI labels and messages
✅ Responsive design (mobile & desktop)
✅ Auto-redirect after successful auth
✅ MongoDB database integration
✅ Beautiful purple-themed forms

## Next Steps (Coming Soon)

1. Create protected API routes middleware
2. Add logout functionality
3. Implement password reset feature
4. Add OAuth (Google, GitHub login)
5. Email verification
6. User profile management
7. Update navbar to show logged-in user

## Troubleshooting

### "MONGODB_URI not defined"
- Check `.env.local` exists in project root
- Restart dev server after adding `.env.local`

### "MongoDB Connection Refused"
- Ensure MongoDB is running: `mongod`
- Or update `MONGODB_URI` to MongoDB Atlas connection string

### "Email already registered"
- Use different email for each registration
- Or check MongoDB database for existing user

### "Invalid password" on login
- Password is case-sensitive
- Ensure you're using correct password

### Forms not submitting
- Check browser console for JavaScript errors
- Ensure API endpoints are accessible
- Verify MongoDB connection is working

## Files Modified/Created

### New Files:
- `/lib/db.ts` - MongoDB connection
- `/lib/models/User.ts` - User schema
- `/src/app/api/auth/register/route.ts` - Register API
- `/src/app/api/auth/login/route.ts` - Login API
- `/src/app/auth/login/page.tsx` - Login page
- `/src/app/auth/register/page.tsx` - Register page
- `/src/components/auth/LoginForm.tsx` - Login form
- `/src/components/auth/RegisterForm.tsx` - Register form
- `/.env.local` - Environment variables
- `/AUTHENTICATION.md` - Detailed auth documentation

### Modified Files:
- `/src/components/layout/Navbar.tsx` - Login button now links to `/auth/login`
