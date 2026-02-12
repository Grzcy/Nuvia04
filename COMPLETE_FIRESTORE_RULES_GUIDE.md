# Complete Firestore Rules for Grazzy - Production Ready

## 📋 Overview

This document contains **complete, production-ready Firestore security rules** for your Grazzy social platform. These rules have been analyzed from your entire codebase and cover all collections used in your application.

---

## 🎯 Quick Deploy

### Option 1: Firebase CLI (Recommended)
```bash
# Copy the complete rules to your firestore.rules file
cp firestore.rules.complete firestore.rules

# Deploy to Firebase
firebase deploy --only firestore:rules
```

### Option 2: Firebase Console
1. Go to: https://console.firebase.google.com/project/grazzy-9e736/firestore/rules
2. Copy the entire content from [`firestore.rules.complete`](firestore.rules.complete:1)
3. Paste into the rules editor
4. Click **"Publish"**

---

## 📊 Collections Covered

### ✅ Main Collections (artifacts/{appId}/...)

#### Private User Data:
- `/users/{userId}/profiles/user_profile` - Private profile data
- `/users/{userId}/profiles/user_settings` - User settings
- `/users/{userId}/profiles/privacy_settings` - Privacy preferences
- `/users/{userId}/notifications/{notificationId}` - User notifications

#### Public User Data:
- `/public/data/users/{userId}` - Public profile information
- `/public_user_data/{userId}` - Alternative public profile path

#### Social Features:
- `/public/data/posts/{postId}` - Feed posts
  - `/comments/{commentId}` - Post comments
    - `/userLikes/{likeId}` - Comment likes
  - `/userReactions/{reactionId}` - Post reactions
  - `/postDailyCounters/{counterId}` - Daily engagement counters
  - `/paidTrackers/{trackerId}` - Payment tracking
- `/public/data/archived_posts/{postId}` - Deleted posts (admin only)
- `/public/data/stories/{storyId}` - User stories

#### Messaging:
- `/public/data/dm_threads/{threadId}` - Direct message threads
  - `/messages/{messageId}` - DM messages
  - `/typing/{userId}` - Typing indicators
- `/public/data/chats/{chatId}` - Alternative chat structure
  - `/messages/{messageId}` - Chat messages
  - `/presence/receipts` - Read receipts
- `/public/data/archived_messages/{messageId}` - Deleted messages (admin only)

#### Groups:
- `/public/data/groups/{groupId}` - Group information
  - `/messages/{messageId}` - Group messages
  - `/requests/{requestId}` - Join requests

#### Social Connections:
- `/public/data/friends/{friendshipId}` - Friend relationships
- `/public/data/friend_requests/{requestId}` - Friend requests

#### Calls:
- `/public/data/calls/{callId}` - Voice/video calls

#### Moderation:
- `/public/data/reports/{reportId}` - User reports

#### Transactions:
- `/public/data/jcoin_buy_requests/{requestId}` - JCoin purchase requests
- `/public/data/pending_activity_rewards/{rewardId}` - Pending rewards
- `/public/data/shop_payment_requests/{requestId}` - Shop payments
- `/public/data/wallet_unlock_requests/{requestId}` - Wallet unlock requests
- `/public/data/verification_requests/{requestId}` - Verification requests
- `/public/data/orders/{orderId}` - Feature orders
- `/public/data/feature_orders/{orderId}` - Alternative orders path

#### Settings:
- `/public/data/settings/{settingId}` - System settings
- `/public/data/system_settings/{settingId}` - Alternative settings path
- `/public/data/app_settings` - App configuration

#### Admin:
- `/public/data/admin_logs/{logId}` - Admin action logs
- `/public/data/meta/{document}` - Metadata and connectivity checks

### ✅ Legacy Collections (for backward compatibility):
- `/users/{userId}` - Legacy user data
- `/posts/{postId}` - Legacy posts
- `/groups/{groupId}` - Legacy groups
- `/directMessages/{messageId}` - Legacy DMs
- `/reports/{reportId}` - Legacy reports
- `/settings/{document}` - Legacy settings
- `/moderation/{document}` - Legacy moderation
- `/analytics/{document}` - Legacy analytics
- `/admins/{document}` - Admin data

---

## 🔐 Security Features

### ✅ Authentication Required
- All operations require `request.auth != null`
- No anonymous access to any data

### ✅ User Data Isolation
- Users can only access their own private data
- Public profiles visible to all authenticated users
- Wallet data restricted to owner and admin

### ✅ Ownership Validation
- Posts: Only author can edit/delete
- Comments: Only author can edit/delete
- Messages: Only sender can delete
- Groups: Only admin/creator can manage

### ✅ Admin Privileges
- Full access to all collections
- Can moderate any content
- Can manage user accounts
- Can view all reports and logs

### ✅ Data Validation
- String length validation on posts (1-5000 characters)
- User ID validation on creation
- Ownership checks on updates

---

## 🚀 Deployment Instructions

### Step 1: Backup Current Rules
```bash
# Download current rules from Firebase
firebase firestore:rules:get > firestore.rules.backup
```

### Step 2: Test Rules Locally (Optional)
```bash
# Start Firebase emulators
firebase emulators:start

# Test your app against local emulator
# Visit: http://localhost:4000 (Emulator UI)
```

### Step 3: Deploy to Production
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy all Firebase rules at once
firebase deploy --only firestore:rules,database,storage
```

### Step 4: Verify Deployment
1. Go to Firebase Console: https://console.firebase.google.com/project/grazzy-9e736/firestore/rules
2. Check for "Rules successfully deployed" message
3. Verify rules are active (green status indicator)

---

## 🧪 Testing Your Rules

### Test in Firebase Console:

1. Go to **Firestore Database** → **Rules** tab
2. Click **"Rules Playground"** button
3. Test different scenarios:

#### Test Case 1: Regular User Reading Posts
```
Location: /artifacts/grazzy-9e736/public/data/posts/test123
Operation: get
Authentication: Authenticated user
Expected: ✅ ALLOW
```

#### Test Case 2: User Accessing Another's Private Profile
```
Location: /artifacts/grazzy-9e736/users/otherUserId/profiles/user_profile
Operation: get
Authentication: Different user
Expected: ❌ DENY
```

#### Test Case 3: Admin Accessing Any Data
```
Location: /artifacts/grazzy-9e736/users/anyUserId/profiles/user_profile
Operation: get
Authentication: Admin user (with admin: true claim)
Expected: ✅ ALLOW
```

#### Test Case 4: Creating a Post
```
Location: /artifacts/grazzy-9e736/public/data/posts/newPost123
Operation: create
Authentication: Authenticated user
Data: { authorId: "currentUserId", content: "Hello world", timestamp: <timestamp> }
Expected: ✅ ALLOW (if authorId matches auth.uid)
```

---

## ⚠️ Important Configuration Steps

### 1. Enable Firebase Authentication
```
Firebase Console → Authentication → Sign-in method → Enable Email/Password
```

### 2. Set Up Admin User
The admin email is: **eletexjoeytex@gmail.com**

Deploy Cloud Functions to auto-assign admin role:
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 3. Deploy Firestore Indexes
```bash
firebase deploy --only firestore:indexes
```

### 4. Deploy Storage Rules
```bash
firebase deploy --only storage
```

### 5. Deploy Realtime Database Rules
```bash
firebase deploy --only database
```

---

## 📝 Firestore Indexes Required

Your app needs these indexes (already in [`firestore.indexes.json`](firestore.indexes.json:1)):

```json
{
  "indexes": [
    {
      "collectionGroup": "posts",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "authorId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "comments",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "postId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "friend_requests",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "receiverId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "calls",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "receiverId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 🔍 Troubleshooting

### Error: "Missing or insufficient permissions"

**Cause**: User not authenticated or rules too restrictive

**Solution**:
1. Check user is logged in: `firebase.auth().currentUser`
2. Verify custom claims are set (for admin)
3. Check the specific collection path in rules
4. Use Rules Playground to test

### Error: "The query requires an index"

**Cause**: Missing Firestore index

**Solution**:
```bash
# Deploy indexes
firebase deploy --only firestore:indexes

# Or click the link in the error message to auto-create index
```

### Error: "auth/configuration-not-found"

**Cause**: Firebase Authentication not enabled

**Solution**:
1. Go to Firebase Console → Authentication
2. Click "Get Started"
3. Enable Email/Password sign-in method

### Rules Not Deploying

**Solution**:
```bash
# Check for syntax errors
firebase deploy --only firestore:rules --debug

# Verify you're in the correct project
firebase use grazzy-9e736

# List all projects
firebase projects:list
```

---

## 📊 Security Best Practices

### ✅ Implemented:
- ✅ Authentication required for all operations
- ✅ User data isolation (private vs public)
- ✅ Ownership validation on writes
- ✅ Admin-only collections protected
- ✅ Email-based admin assignment
- ✅ Custom claim validation
- ✅ Data validation on creation

### 🔒 Additional Recommendations:

1. **Enable App Check** (Recommended for production)
   ```
   Firebase Console → App Check → Register your app
   ```

2. **Set Up Email Verification**
   ```javascript
   // In your signup flow
   await sendEmailVerification(user);
   ```

3. **Monitor Rules Usage**
   ```
   Firebase Console → Firestore → Usage tab
   ```

4. **Set Up Alerts**
   ```
   Firebase Console → Alerts → Create alert for unusual activity
   ```

5. **Regular Security Audits**
   - Review rules monthly
   - Check for unused collections
   - Monitor failed permission attempts

---

## 📈 Performance Optimization

### Indexes Deployed:
- Posts by author and timestamp
- Comments by post and timestamp
- Friend requests by receiver and status
- Calls by receiver and status

### Query Optimization Tips:
1. Always use indexes for compound queries
2. Limit query results (use `.limit()`)
3. Use pagination for large datasets
4. Cache frequently accessed data
5. Use subcollections for related data

---

## 🎯 Deployment Checklist

Before going live, ensure:

- [ ] Firestore rules deployed
- [ ] Firestore indexes deployed
- [ ] Realtime Database rules deployed
- [ ] Storage rules deployed
- [ ] Cloud Functions deployed
- [ ] Email/Password authentication enabled
- [ ] Admin user configured (eletexjoeytex@gmail.com)
- [ ] Test user signup
- [ ] Test user login
- [ ] Test post creation
- [ ] Test messaging
- [ ] Test admin features
- [ ] Monitor Firebase Console for errors
- [ ] Set up billing alerts
- [ ] Configure custom domain (if applicable)

---

## 📞 Support

### Firebase Resources:
- **Console**: https://console.firebase.google.com/project/grazzy-9e736
- **Documentation**: https://firebase.google.com/docs/firestore/security/get-started
- **Rules Reference**: https://firebase.google.com/docs/firestore/security/rules-structure

### Admin Contact:
- **Email**: eletexjoeytex@gmail.com
- **Auto-Admin**: This email automatically gets admin privileges

---

## 🔄 Updating Rules

When you need to update rules:

1. **Edit** [`firestore.rules.complete`](firestore.rules.complete:1)
2. **Test** locally with emulators
3. **Deploy** with `firebase deploy --only firestore:rules`
4. **Verify** in Firebase Console
5. **Monitor** for permission errors

---

## 📝 Rule Structure Explained

### Your App Uses Two Patterns:

#### Pattern 1: Artifacts Collection (Primary)
```
/artifacts/{appId}/users/{userId}/profiles/user_profile
/artifacts/{appId}/public/data/users/{userId}
/artifacts/{appId}/public/data/posts/{postId}
```

#### Pattern 2: Legacy Collections (Backward Compatibility)
```
/users/{userId}
/posts/{postId}
/groups/{groupId}
```

**Both patterns are supported** in the complete rules file to ensure nothing breaks.

---

## 🚨 Critical Security Notes

### 1. Admin Email
- **Email**: `eletexjoeytex@gmail.com`
- **Auto-Admin**: Cloud Functions automatically grant admin privileges
- **Custom Claim**: `request.auth.token.admin == true`

### 2. User Privacy
- **Private data**: Only owner and admin can access
- **Public data**: All authenticated users can read
- **Wallet data**: Strictly private (owner + admin only)

### 3. Content Moderation
- **Reports**: Only reporter and admin can view
- **Archived content**: Admin only
- **Admin logs**: Admin only

### 4. Messaging Privacy
- **DMs**: Only participants can read
- **Group messages**: Only group members can read
- **Typing indicators**: Real-time, participants only

---

## 🎨 Data Structure

### User Profile Structure:
```javascript
// Private: /artifacts/{appId}/users/{userId}/profiles/user_profile
{
  username: "string",
  email: "string",
  jCoins: number,
  gas: number,
  level: number,
  xp: number,
  verified: boolean,
  // ... other private fields
}

// Public: /artifacts/{appId}/public/data/users/{userId}
{
  username: "string",
  displayName: "string",
  profilePicId: "string",
  level: number,
  online: boolean,
  lastActive: timestamp,
  inCall: boolean,
  // ... other public fields
}
```

### Post Structure:
```javascript
// /artifacts/{appId}/public/data/posts/{postId}
{
  authorId: "userId",
  content: "string (1-5000 chars)",
  timestamp: timestamp,
  likes: number,
  commentsCount: number,
  profilePhoto: "string",
  username: "string",
  // ... other fields
}
```

---

## 🔧 Maintenance

### Regular Tasks:
1. **Weekly**: Check Firebase Console for errors
2. **Monthly**: Review rules for optimization
3. **Quarterly**: Security audit
4. **Yearly**: Full system review

### Monitoring:
- Firebase Console → Firestore → Usage
- Check for permission denied errors
- Monitor query performance
- Review storage costs

---

## ✅ Verification Steps

After deploying rules:

### 1. Test User Signup
```javascript
// Should work
await createUserWithEmailAndPassword(auth, email, password);
```

### 2. Test Profile Creation
```javascript
// Should work for own profile
await setDoc(doc(db, 'artifacts', appId, 'users', userId, 'profiles', 'user_profile'), {...});
```

### 3. Test Post Creation
```javascript
// Should work if authorId matches auth.uid
await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'posts'), {
  authorId: currentUser.uid,
  content: "Test post",
  timestamp: serverTimestamp()
});
```

### 4. Test Admin Access
```javascript
// Should work only for admin
await getDoc(doc(db, 'artifacts', appId, 'public', 'data', 'admin_logs', 'test'));
```

---

## 🎓 Understanding the Rules

### Key Concepts:

#### 1. Helper Functions
```javascript
function isSignedIn() {
  return request.auth != null;  // User is logged in
}

function isOwner(uid) {
  return request.auth.uid == uid;  // User owns this resource
}

function isAdmin() {
  return request.auth.token.admin == true;  // User has admin claim
}
```

#### 2. Permission Types
- **read**: Get documents and list collections
- **write**: Create, update, and delete
- **create**: Only create new documents
- **update**: Only modify existing documents
- **delete**: Only remove documents

#### 3. Resource vs Request
- **resource.data**: Existing document data
- **request.resource.data**: New/updated document data
- **request.auth**: Current user's auth info

---

## 🌟 Advanced Features

### 1. Conditional Access
```javascript
// Users can update their own posts OR admin can update any post
allow update: if isSignedIn() && 
               (resource.data.authorId == request.auth.uid || isAdmin());
```

### 2. Array Membership
```javascript
// Check if user is in group members array
allow update: if request.auth.uid in resource.data.members;
```

### 3. Data Validation
```javascript
// Validate post content length
allow create: if isValidString(request.resource.data.content, 1, 5000);
```

---

## 📦 Complete Package

Your deployment package includes:

1. **[`firestore.rules.complete`](firestore.rules.complete:1)** - Complete Firestore rules
2. **[`storage.rules`](storage.rules:1)** - Cloud Storage rules
3. **[`database.rules.json`](database.rules.json:1)** - Realtime Database rules
4. **[`firestore.indexes.json`](firestore.indexes.json:1)** - Query indexes
5. **[`firebase.json`](firebase.json:1)** - Firebase configuration
6. **[`functions/index.js`](functions/index.js:1)** - Cloud Functions for admin
7. **This guide** - Complete documentation

---

## 🎉 Ready to Deploy!

Your Firestore rules are **production-ready** and cover:
- ✅ All 50+ collections used in your app
- ✅ Complete security isolation
- ✅ Admin privileges
- ✅ User privacy protection
- ✅ Content moderation
- ✅ Transaction security
- ✅ Messaging privacy
- ✅ Group management
- ✅ Legacy compatibility

**Deploy with confidence!** 🚀

---

## 📞 Need Help?

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Review Firebase Console error logs
3. Test with Rules Playground
4. Check [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md:1) for authentication setup
5. Review [`PUBLISH_RULES.md`](PUBLISH_RULES.md:1) for deployment details

---

**Last Updated**: 2026-02-12
**Project**: Grazzy (grazzy-9e736)
**Status**: ✅ Production Ready
