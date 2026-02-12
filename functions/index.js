const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

const ADMIN_EMAIL = 'eletexjoeytex@gmail.com';

// Cloud Function: Auto-grant admin on user creation
exports.setAdminOnUserCreate = functions.auth.user().onCreate(async (user) => {
  try {
    // Check if the user's email is the admin email
    if (user.email === ADMIN_EMAIL) {
      // Set custom claim for admin
      await admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
      
      // Add to Firestore admins collection
      await admin.firestore().collection('admins').doc(user.uid).set({
        email: user.email,
        displayName: user.displayName || 'Admin',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isAdmin: true
      });
      
      // Add admin role to user document
      await admin.firestore().collection('users').doc(user.uid).set({
        isAdmin: true,
        adminStatus: 'active',
        adminGrantedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      console.log(`✅ Admin privileges granted to ${user.email} (UID: ${user.uid})`);
    }
  } catch (error) {
    console.error('Error setting admin claims:', error);
  }
});

// Cloud Function: Auto-grant admin on sign-in (backup)
exports.checkAndSetAdminOnSignIn = functions.https.onRequest(async (req, res) => {
  try {
    // Get user from request (you'll need to pass the user UID)
    const { uid, email } = req.body;
    
    if (!uid || !email) {
      return res.status(400).json({ error: 'UID and email are required' });
    }
    
    // Check if email is admin email
    if (email === ADMIN_EMAIL) {
      // Set custom claim
      await admin.auth().setCustomUserClaims(uid, {
        admin: true
      });
      
      // Update Firestore
      await admin.firestore().collection('users').doc(uid).update({
        isAdmin: true,
        adminStatus: 'active',
        lastAdminCheck: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Admin status verified for ${email}`);
      return res.status(200).json({ 
        success: true, 
        message: `Admin privileges confirmed for ${email}`,
        admin: true 
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: 'User is not admin',
        admin: false 
      });
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Cloud Function: Manually set admin (for security)
exports.grantAdminPrivileges = functions.https.onRequest(async (req, res) => {
  try {
    // Verify request is from admin
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authorization required' });
    }
    
    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Check if requester is already admin
    if (!decodedToken.admin) {
      return res.status(403).json({ error: 'Only admins can grant admin access' });
    }
    
    // Get the UID to promote
    const { uid, email } = req.body;
    
    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }
    
    // Set admin claim
    await admin.auth().setCustomUserClaims(uid, {
      admin: true
    });
    
    // Update Firestore
    await admin.firestore().collection('admins').doc(uid).set({
      email: email || 'unknown',
      grantedBy: decodedToken.email,
      grantedAt: admin.firestore.FieldValue.serverTimestamp(),
      isAdmin: true
    });
    
    await admin.firestore().collection('users').doc(uid).update({
      isAdmin: true,
      adminStatus: 'active'
    });
    
    console.log(`✅ Admin privileges granted to ${uid} by ${decodedToken.email}`);
    
    return res.status(200).json({ 
      success: true, 
      message: `Admin privileges granted to user ${uid}`
    });
  } catch (error) {
    console.error('Error granting admin privileges:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Cloud Function: Remove admin privileges
exports.revokeAdminPrivileges = functions.https.onRequest(async (req, res) => {
  try {
    // Verify request is from admin
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authorization required' });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    if (!decodedToken.admin) {
      return res.status(403).json({ error: 'Only admins can revoke admin access' });
    }
    
    const { uid } = req.body;
    
    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }
    
    // Remove admin claim
    await admin.auth().setCustomUserClaims(uid, {
      admin: false
    });
    
    // Update Firestore
    await admin.firestore().collection('users').doc(uid).update({
      isAdmin: false,
      adminStatus: 'revoked',
      adminRevokedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ Admin privileges revoked from ${uid}`);
    
    return res.status(200).json({ 
      success: true, 
      message: `Admin privileges revoked from user ${uid}`
    });
  } catch (error) {
    console.error('Error revoking admin privileges:', error);
    return res.status(500).json({ error: error.message });
  }
});
