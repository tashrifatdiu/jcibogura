# Appwrite Setup Checklist

Use this checklist to ensure everything is configured correctly.

## ✓ Database Setup

- [ ] Database `jcibogura_db` exists
- [ ] Database is accessible

## ✓ Collections Created

- [ ] `users` collection exists
- [ ] `courses` collection exists
- [ ] `modules` collection exists
- [ ] `videos` collection exists
- [ ] `user_progress` collection exists

## ✓ Users Collection Attributes

- [ ] userId (String, 255)
- [ ] firstName (String, 100)
- [ ] lastName (String, 100)
- [ ] age (Integer)
- [ ] profession (String, 50)
- [ ] institute (String, 255, optional)
- [ ] company (String, 255, optional)
- [ ] position (String, 100, optional)
- [ ] address (String, 500)
- [ ] phoneNumber (String, 20)
- [ ] email (String, 255)

## ✓ Courses Collection Attributes

- [ ] title (String, 255)
- [ ] overview (String, 1000)

## ✓ Modules Collection Attributes

- [ ] courseId (String, 255)
- [ ] title (String, 255)
- [ ] order (Integer)

## ✓ Videos Collection Attributes

- [ ] moduleId (String, 255)
- [ ] title (String, 255)
- [ ] description (String, 1000)
- [ ] youtubeLink (String, 500)
- [ ] order (Integer)

## ✓ User Progress Collection Attributes

- [ ] userId (String, 255)
- [ ] videoId (String, 255)
- [ ] completed (Boolean)
- [ ] completedAt (String, 100, optional)

## ✓ Permissions Set

### Users Collection:
- [ ] Read: Users
- [ ] Create: Users
- [ ] Update: User:[USER_ID]
- [ ] Delete: User:[USER_ID]

### Courses Collection:
- [ ] Read: Any
- [ ] Create: Users
- [ ] Update: Users
- [ ] Delete: Users

### Modules Collection:
- [ ] Read: Any
- [ ] Create: Users
- [ ] Update: Users
- [ ] Delete: Users

### Videos Collection:
- [ ] Read: Any
- [ ] Create: Users
- [ ] Update: Users
- [ ] Delete: Users

### User Progress Collection:
- [ ] Read: Users
- [ ] Create: Users
- [ ] Update: Users
- [ ] Delete: Users

## ✓ Authentication Setup

- [ ] Admin account created in Appwrite Auth
- [ ] Admin email matches `.env` file: `jcibogura@gmail.com`
- [ ] Email/Password authentication is enabled

## ✓ Environment Variables

Check your `.env` file has:
- [ ] VITE_APPWRITE_ENDPOINT
- [ ] VITE_APPWRITE_PROJECT_ID
- [ ] VITE_APPWRITE_DATABASE_ID
- [ ] VITE_APPWRITE_USERS_COLLECTION_ID
- [ ] VITE_APPWRITE_COURSES_COLLECTION_ID
- [ ] VITE_APPWRITE_MODULES_COLLECTION_ID
- [ ] VITE_APPWRITE_VIDEOS_COLLECTION_ID
- [ ] VITE_APPWRITE_USER_PROGRESS_COLLECTION_ID
- [ ] VITE_ADMIN_EMAIL

## ✓ Testing

- [ ] App connects to Appwrite (check console for "Appwrite connection successful!")
- [ ] User registration works
- [ ] User login works
- [ ] Admin login works
- [ ] Admin can create courses
- [ ] Admin can add modules
- [ ] Admin can add videos
- [ ] Users can view courses
- [ ] Users can watch videos
- [ ] Users can mark videos as complete

## Common Issues

**404 Errors:**
- Collection IDs must be exact: `courses`, `modules`, `videos`, `user_progress`
- Check spelling and case sensitivity

**401 Errors:**
- Verify permissions are set correctly
- Make sure you're logged in
- Check admin email matches in both Appwrite Auth and `.env`

**Connection Failed:**
- Verify Project ID is correct
- Check endpoint URL
- Ensure internet connection

**Can't Create Documents:**
- Check all required attributes exist
- Verify attribute types match
- Ensure permissions allow creation

---

## Quick Fix Commands

If you need to restart:

```bash
# Stop the dev server (Ctrl + C)
# Clear node modules cache
npm run dev
```

If issues persist:
1. Clear browser cache
2. Check Appwrite Console for error details
3. Verify all collection IDs match exactly
4. Review permissions for each collection
