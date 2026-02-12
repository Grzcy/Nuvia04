# Admin Setup Guide - Nuvia App

## Admin Email Configuration

**Admin Email:** `eletexjoeytex@gmail.com`

Anyone who logs in with this email will automatically receive full admin control access.

---

## How It Works

### 1. Automatic Admin Assignment

When a user signs up or logs in with the admin email (`eletexjoeytex@gmail.com`), they automatically get:

- ✅ Custom claim: `admin: true`
- ✅ Firestore document in `/admins` collection
- ✅ Full access to all admin panels
- ✅ Permission to manage all users, posts, groups
- ✅ Access to analytics and reporting dashboards

### 2. Cloud Functions

The following Cloud Functions handle admin assignment:

**`setAdminOnUserCreate`**
- Triggers when a new user is created
- Checks if email matches `eletexjoeytex@gmail.com`
- Grants admin privileges automatically

**`checkAndSetAdminOnSignIn`** (Backup)
- Called during sign-in
- Verifies admin email status
- Grants admin if not already set

**`grantAdminPrivileges`** (Manual)
- HTTP function for manual admin assignment
- Requires auth from existing admin
- Can promote other users to admin

**`revokeAdminPrivileges`** (Manual)
- HTTP function to remove admin access
- Requires auth from existing admin
- Can demote admin users

---

## Setup Instructions

### Step 1: Deploy Cloud Functions

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy functions
cd functions
npm install
firebase deploy --only functions
```

### Step 2: Create Firestore Collections

Go to Firebase Console → Firestore Database:

1. **Create collection:** `admins`
   - Document ID: auto-generated
   - Fields:
     - `email`: string (admin email)
     - `isAdmin`: boolean (true)
     - `createdAt`: timestamp

2. **Update users collection**
   - Add field to user document: `isAdmin: boolean`
   - Only admin email will have this set to `true`

### Step 3: Sign In as Admin

1. Go to login page
2. Sign up or log in with: `eletexjoeytex@gmail.com`
3. System automatically grants admin privileges
4. Access admin panels:
   - `/admin.html` - User management
   - `/admin_settings.html` - App settings
   - `/admin_reports.html` - Reports & moderation
   - `/leaders_admin.html` - Leaderboards
   - `/analytics.html` - Analytics dashboard

---

## Admin Capabilities

Once logged in as admin, you can:

### User Management
- ✅ View all users
- ✅ Ban/suspend users
- ✅ Delete user accounts
- ✅ View user profiles
- ✅ Reset passwords
- ✅ Grant/revoke admin status

### Content Moderation
- ✅ Delete inappropriate posts
- ✅ Delete comments
- ✅ Handle user reports
- ✅ Ban content creators
- ✅ View moderation logs

### System Settings
- ✅ Update app settings
- ✅ Configure features
- ✅ Manage coins system
- ✅ Configure badges and levels
- ✅ Set premium settings

### Analytics
- ✅ View user statistics
- ✅ Monitor daily active users
- ✅ Track engagement metrics
- ✅ View revenue data
- ✅ See leaderboards

---

## Security Rules

The Firestore rules ensure:

```javascript
// Only users with admin: true custom claim can access admin data
function isAdmin() {
  return request.auth.token.admin == true;
}

match /admin/{document=**} {
  allow read: if isSignedIn() && isAdmin();
  allow write: if isSignedIn() && isAdmin();
}
```

---

## Granting Admin to Other Users

### Option 1: Automatic (Recommended)
- Have them sign up with the admin email
- Automatically gets admin access

### Option 2: Manual (via Cloud Function)

```bash
# Call the grantAdminPrivileges function
curl -X POST \
  https://us-central1-grazzy-9e736.cloudfunctions.net/grantAdminPrivileges \
  -H "Authorization: Bearer [ADMIN_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "USER_UID_TO_PROMOTE",
    "email": "user@example.com"
  }'
```

### Option 3: Firebase Console
1. Go to Firebase Console
2. Authentication → Users
3. Find user
4. Click custom claims
5. Add: `{"admin": true}`

---

## Revoking Admin Access

```bash
curl -X POST \
  https://us-central1-grazzy-9e736.cloudfunctions.net/revokeAdminPrivileges \
  -H "Authorization: Bearer [ADMIN_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "ADMIN_UID_TO_REMOVE"
  }'
```

---

## Testing Admin Functions

### Local Emulator
```bash
firebase emulators:start
```

Then test functions at: `http://localhost:5001`

---

## Important Security Notes

1. **Keep Email Secret**: The admin email is sensitive. Don't share it publicly.
2. **Custom Claims**: Verified on every request in Firestore rules
3. **Cloud Functions**: Validate all requests and verify tokens
4. **Audit Logs**: All admin actions should be logged
5. **Two-Factor Auth**: Consider enabling 2FA for the admin account

---

## Troubleshooting

### Admin access not working?

1. **Check custom claims:**
   ```bash
   firebase functions:log
   ```

2. **Verify Firestore rules deployed:**
   - Firebase Console → Firestore → Rules tab
   - Should contain the admin check functions

3. **Clear browser cache:**
   - Clear localStorage
   - Logout and login again

4. **Check user document:**
   - Firebase Console → Firestore
   - Navigate to `/users/{userId}`
   - Verify `isAdmin: true` field exists

---

## Admin Email Change

To change the admin email from `eletexjoeytex@gmail.com`:

1. Edit `functions/index.js`
2. Change: `const ADMIN_EMAIL = 'your-new-email@gmail.com'`
3. Redeploy: `firebase deploy --only functions`

---

## Support

For issues or questions about admin setup:
1. Check Firebase Console logs
2. Review Cloud Functions logs
3. Verify Firestore security rules
4. Check browser console for errors

