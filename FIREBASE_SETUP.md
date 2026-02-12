# Firebase Authentication Setup Guide

## Error: `auth/configuration-not-found`

This error means Firebase Authentication is not properly configured in your Firebase project. Follow these steps to fix it:

## Step-by-Step Setup:

### 1. Go to Firebase Console
Visit: https://console.firebase.google.com/

### 2. Select Your Project
- Click on your project: **grazzy-9e736**

### 3. Enable Authentication
1. In the left sidebar, click on **"Authentication"**
2. Click on the **"Get Started"** button (if you haven't set up Authentication yet)

### 4. Enable Email/Password Sign-in Method
1. Click on the **"Sign-in method"** tab
2. Find **"Email/Password"** in the list of providers
3. Click on it to expand
4. Toggle the **"Enable"** switch to ON
5. Click **"Save"**

### 5. (Optional) Enable Email Link Sign-in
- If you want passwordless email link authentication, also enable the second toggle
- This is optional and not required for basic email/password authentication

### 6. Verify Configuration
After enabling Email/Password authentication:
1. Go back to your Grazzy login page
2. Try to sign up with a new account
3. The error should now be resolved

## Current Firebase Configuration

Your app is configured with:
- **Project ID**: grazzy-9e736
- **Auth Domain**: grazzy-9e736.firebaseapp.com
- **API Key**: AIzaSyAm8ghbQ_lwJdNXEhWGos0eyi5wtvGuRR4

## Additional Authentication Methods (Optional)

You can also enable other sign-in methods:
- Google Sign-in
- Facebook Sign-in
- Twitter Sign-in
- GitHub Sign-in
- Phone Authentication
- Anonymous Authentication

## Firestore Security Rules

Make sure your Firestore security rules allow authenticated users to read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Testing

After setup, test the following:
1. **Sign Up**: Create a new account with email and password
2. **Sign In**: Log in with the created account
3. **Password Reset**: Test the "Forgot Password" functionality

## Troubleshooting

### Still getting errors?
1. Clear browser cache and cookies
2. Check Firebase Console → Authentication → Users to see if accounts are being created
3. Check browser console (F12) for detailed error messages
4. Verify your Firebase configuration in login.html matches your Firebase project

### Need help?
- Firebase Documentation: https://firebase.google.com/docs/auth
- Firebase Support: https://firebase.google.com/support

## Security Notes

⚠️ **Important Security Considerations:**
1. Never commit your Firebase API keys to public repositories
2. Set up proper Firestore security rules
3. Enable App Check for additional security
4. Monitor authentication usage in Firebase Console
5. Set up email verification for new accounts (recommended)

## Next Steps

After enabling authentication:
1. Test user registration
2. Test user login
3. Set up email verification (optional but recommended)
4. Configure password reset emails
5. Customize authentication UI/UX
6. Set up user profiles in Firestore
