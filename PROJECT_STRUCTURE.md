# Nuvia Project Structure & Architecture

## Project Overview

**Nuvia** is a full-featured social chat platform built with:
- **Frontend**: Vanilla JavaScript + HTML/CSS (ES6 modules)
- **Backend**: Node.js Express server with Google Gemini AI integration
- **Database**: Firebase (Firestore + Realtime Database)
- **Storage**: Cloudinary for images/media
- **Authentication**: Firebase Auth with custom admin claims
- **Hosting**: Firebase Hosting compatible

---

## Directory Structure

```
Nuvia/
├── Root HTML Pages (59 files)
│   ├── index.html                 # Home/Feed page
│   ├── login.html                 # Authentication page
│   ├── chat.html                  # Direct messaging
│   ├── group_chat.html            # Group messaging
│   ├── profile.html               # User profile
│   ├── wallet.html                # Wallet/coins management
│   ├── marketplace.html           # In-app marketplace
│   ├── settings.html              # User settings
│   ├── explore.html               # Discover content
│   ├── notifications.html         # Notifications
│   ├── leaderboard.html           # User rankings
│   ├── groups.html                # Groups management
│   ├── admin.html                 # Admin dashboard
│   ├── analytics.html             # Analytics dashboard
│   ├── admin_settings.html        # Admin settings
│   ├── admin_reports.html         # Moderation reports
│   ├── admin_logs.html            # Admin action logs
│   ├── content_moderation.html    # Content moderation
│   ├── premium_admin.html         # Premium management
│   ├── And 40+ more pages...
│
├── assets/
│   ├── js/                        # Utility modules
│   │   ├── session-manager.js     # Session management (single device login)
│   │   ├── avatar-utils.js        # Avatar/image utilities
│   │   ├── fetch-guard.js         # Network error handling
│   │   ├── verification-utils.js  # Email verification
│   │   ├── share-utils.js         # Share functionality
│   │   ├── leaderboard.js         # Leaderboard logic
│   │   ├── index-persist.js       # Local storage persistence
│   │   ├── lazy-images.js         # Image lazy loading
│   │   ├── theme-pinkyellow-dark.js # Theme system
│   │   └── admin-uid.js           # Admin utilities
│   │
│   ├── badges/                    # Badge icons (12+ badges)
│   └── css/
│       └── community_guidelines.css
│
├── Core Service Files
│   ├── sw.js                      # Service Worker (offline support)
│   ├── nuvia-global-call-service.js # Voice/video call notifications
│   ├── mcp-server.mjs             # Express server (Gemini AI integration)
│   │
│   ├── Utility Scripts
│   ├── bank-details.js            # Bank integration
│   ├── currency.js                # Currency conversion
│   ├── wallet-security.js         # Wallet encryption
│   └── nuvia-global-call-service.js # Call handling
│
├── Configuration Files
│   ├── package.json               # Root npm dependencies
│   ├── package-lock.json          # Dependency lock
│   ├── firebase.json              # Firebase config
│   ├── .firebaserc                # Firebase project reference
│   ├── firestore.rules            # Firestore security rules
│   ├── firestore.indexes.json     # Query indexes
│   ├── database.rules.json        # Realtime DB rules
│   ├── storage.rules              # Cloud Storage rules
│   ├── ADMIN_SETUP.md             # Admin configuration guide
│   └── PROJECT_STRUCTURE.md       # This file
│
├── Cloud Functions
│   ├── functions/
│   │   ├── index.js               # Cloud Functions for admin access
│   │   └── package.json           # Functions dependencies
│   │
│   └── Sub-project (Cloudflare Workers)
│       └── calm-unit-08b9/
│           ├── package.json
│           ├── tsconfig.json
│           ├── wrangler.jsonc     # Cloudflare Workers config
│           └── src/
│               └── index.ts       # Worker entry point
```

---

## Core Components

### 1. **Authentication System** (login.html, index.html)
- Email/password authentication
- Sign up functionality
- Password reset
- Auto-admin assignment for `eletexjoeytex@gmail.com`
- Session management (single device per user)
- Firebase Auth integration

### 2. **Feed System** (index.html)
- Create posts with images/videos
- Like/react to posts
- Comment on posts
- Share functionality
- Feed filtering
- Inspiration quotes (Bible, Quran, motivational, etc.)

### 3. **Messaging System** (chat.html, group_chat.html)
- Direct messaging
- Group chats
- Real-time notifications
- Voice/video call integration
- Message reactions
- Media sharing

### 4. **User Profile System** (profile.html)
- Profile information
- Avatar/profile picture
- Badges and achievements
- Level/experience system
- Follow/unfollow users
- User statistics

### 5. **Wallet System** (wallet.html, coin_management.html)
- JCoins currency management
- Wallet balance
- Transaction history
- Bank integration
- Payment requests
- Wallet security

### 6. **Admin System** (admin.html, admin_settings.html, etc.)
- User management
- Content moderation
- Report handling
- Analytics
- System settings
- Admin logs
- Automatic admin assignment

### 7. **Marketplace** (marketplace.html, store.html)
- In-app purchases
- Premium themes
- Subscription management
- Product listings
- Payment processing

### 8. **Analytics** (analytics.html)
- User statistics
- Engagement metrics
- Leaderboards
- Trending content
- Revenue tracking

---

## Firebase Configuration

**Project ID:** `grazzy-9e736`
**Database URL:** `https://grazzy-9e736-default-rtdb.firebaseio.com`

### Firestore Collections
- `/users/{userId}` - User profiles and data
  - `/profile/` - Profile information
  - `/wallet/` - Wallet data
  - `/badges/` - User badges
  - `/notifications/` - Notifications
- `/posts/{postId}` - Feed posts
  - `/comments/` - Post comments
  - `/reactions/` - Post reactions
- `/groups/{groupId}` - Group chats
  - `/members/` - Group members
  - `/messages/` - Group messages
- `/directMessages/{messageId}` - DM conversations
- `/reports/{reportId}` - User reports
- `/admin/{document}` - Admin data (restricted)
- `/analytics/{document}` - Analytics data
- `/moderation/{document}` - Moderation logs
- `/settings/{document}` - App settings

### Realtime Database
- `/users/` - Online status
- `/onlineStatus/` - User presence
- `/userPresence/` - Last seen
- `/notifications/` - Real-time notifications
- `/recentChats/` - Recent conversations
- `/admin/` - Admin data

### Cloud Storage
- `users/{userId}/profile/` - Profile pictures
- `posts/{postId}/` - Post images/videos
- `groups/{groupId}/` - Group images
- `chats/{chatId}/` - Chat media
- `admin/` - Admin uploads

---

## Key JavaScript Modules

### session-manager.js
- Single active session per user
- Detects multi-device login
- Auto sign-out on remote login
- Heartbeat monitoring

### avatar-utils.js
- Cloudinary URL generation
- Image transformations
- Placeholder avatars
- Lazy loading

### fetch-guard.js
- Network error handling
- Retry logic for Firebase APIs
- Offline support
- Error recovery

### nuvia-global-call-service.js
- Incoming call notifications
- Call overlay UI
- Ringtone playback
- Call acceptance/decline
- Real-time and polling fallback

### sw.js (Service Worker)
- Offline support
- Cache management
- Network interception
- URL normalization
- Fallback pages

---

## Backend Services

### mcp-server.mjs (Express Server)
- **Port:** 3000 (with fallbacks 4000, 5000)
- **Endpoints:**
  - `POST /mcp` - Gemini AI chat
  - `GET /` - Health check
- **Features:**
  - Google Gemini AI integration
  - CORS enabled
  - JSON parsing
  - Error handling

### Cloud Functions (functions/index.js)
- `setAdminOnUserCreate()` - Auto-grant admin on signup
- `checkAndSetAdminOnSignIn()` - Verify admin on login
- `grantAdminPrivileges()` - Manually grant admin
- `revokeAdminPrivileges()` - Remove admin access

---

## Authentication Flow

```
User visits login.html
         ↓
Enters email & password
         ↓
Firebase Auth sign in/sign up
         ↓
Cloud Function triggers
         ↓
Check if email == eletexjoeytex@gmail.com
         ↓
YES: Set admin: true custom claim
NO: Continue as regular user
         ↓
Session Manager registers session
         ↓
User redirected to index.html
         ↓
App loads user data from Firestore
```

---

## Files Updated with New Firebase Config (grazzy-9e736)

**Total: 16 files**

### HTML Files (15)
1. index.html
2. admin.html
3. admin_settings.html
4. admin_reports.html
5. analytics.html
6. coin_management.html
7. developer.html
8. Find_Friends.html
9. group_chat.html
10. group_settings.html
11. leaders_admin.html
12. login.html
13. report.html
14. Report.html
15. approving.html

### JavaScript Files (1)
16. community_guidelines.js

**All files now configured with:**
- New API Key
- New Auth Domain
- New Project ID
- New Storage Bucket
- New Messaging Sender ID
- New App ID
- New Measurement ID
- **NEW:** Realtime Database URL

---

## Configuration Files Created

1. **firebase.json** - Firebase hosting & emulator config
2. **firestore.rules** - Firestore security rules with admin checks
3. **firestore.indexes.json** - Query optimization indexes
4. **database.rules.json** - Realtime Database security rules
5. **storage.rules** - Cloud Storage access rules
6. **.firebaserc** - Firebase CLI project reference
7. **functions/index.js** - Cloud Functions for admin management
8. **functions/package.json** - Functions dependencies
9. **ADMIN_SETUP.md** - Admin setup guide
10. **PROJECT_STRUCTURE.md** - This documentation

---

## External Dependencies

### NPM Packages (Root)
- `express` - Web server
- `cors` - Cross-origin support
- `body-parser` - JSON parsing
- `dotenv` - Environment variables
- `@google/genai` - Gemini AI client

### Firebase Libraries (CDN)
- Firebase App
- Firebase Auth
- Firebase Firestore
- Firebase Storage
- Firebase Cloud Messaging
- Firebase Realtime Database
- Firebase Analytics

### Third-party Services
- **Cloudinary** - Image storage & CDO
  - Cloud Name: `dxld01rcp`
  - Upload Preset: `Storage_preset`
- **Google Gemini** - AI integration
- **Google Analytics** - Analytics tracking
- **Font Awesome** - Icons
- **Tone.js** - Audio notifications
- **Google Fonts** - Typography

---

## Security Features

### Authentication
- Email/password authentication
- Custom claims for admin
- Session management
- Multi-device detection

### Firestore Rules
- User data isolation
- Admin-only collections
- Comment/reaction permissions
- Group member restrictions
- Report handling

### Realtime Database Rules
- Online status tracking
- Notification delivery
- Chat data access
- Admin data protection

### Cloud Storage Rules
- Profile picture uploads
- Post media storage
- Group image management
- Admin file restrictions

---

## Environment Variables

Required:
- `GEMINI_API_KEY` - Google Gemini API key
- `PORT` - Server port (optional, defaults to 3000)

---

## Development Workflow

1. **Local Development**
   ```bash
   npm install
   npm run dev
   ```

2. **Firebase Emulator**
   ```bash
   firebase emulators:start
   ```

3. **Deploy Functions**
   ```bash
   firebase deploy --only functions
   ```

4. **Deploy Rules**
   ```bash
   firebase deploy --only firestore:rules,database,storage
   ```

5. **Deploy Hosting**
   ```bash
   firebase deploy --only hosting
   ```

---

## Deployment Checklist

- [ ] Update GEMINI_API_KEY in environment
- [ ] Deploy Cloud Functions
- [ ] Deploy Firestore rules
- [ ] Deploy Realtime Database rules
- [ ] Deploy Storage rules
- [ ] Test admin login with `eletexjoeytex@gmail.com`
- [ ] Verify authentication flow
- [ ] Test user creation
- [ ] Test file uploads
- [ ] Enable Firebase services if needed
- [ ] Set up email templates in Firebase Console
- [ ] Configure domain in Firebase Hosting

---

## Monitoring & Maintenance

### Firebase Console Checks
- **Authentication:** User count, login methods
- **Firestore:** Data growth, query performance
- **Cloud Storage:** Upload usage, bandwidth
- **Cloud Functions:** Execution times, errors
- **Analytics:** User engagement, retention

### Key Metrics
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Engagement rate
- Retention rate
- Revenue (if applicable)
- Error rates

---

## Future Enhancement Opportunities

1. **Real-time Sync**
   - Optimize Firestore queries
   - Implement pagination
   - Add caching layer

2. **Performance**
   - Code splitting
   - Lazy loading pages
   - Asset optimization

3. **Features**
   - Live video streaming
   - Story features
   - Discover algorithm
   - Push notifications

4. **Scale**
   - Database sharding
   - CDN optimization
   - Regional deployment
   - Load balancing

---

## Contact & Support

- **Admin Email:** eletexjoeytex@gmail.com (auto-admin access)
- **Firebase Console:** https://console.firebase.google.com/project/grazzy-9e736
- **GitHub:** Grzcy/Nuvia04

---

**Last Updated:** 2025
**Firebase Project:** grazzy-9e736
**Status:** Production Ready
