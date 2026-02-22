# Quick Appwrite Collections Setup Guide

Follow these steps to create all required collections for the course platform.

## Step 1: Create Courses Collection

1. Go to Appwrite Console → Databases → `jcibogura_db`
2. Click **Create Collection**
3. **Collection ID**: `courses` (must be exactly this)
4. **Collection Name**: `Courses`
5. Click **Create**

### Add Attributes to Courses:

Click on the `courses` collection, then go to **Attributes** tab:

1. Click **Create Attribute** → **String**
   - Key: `title`
   - Size: 255
   - Required: Yes
   - Click **Create**

2. Click **Create Attribute** → **String**
   - Key: `overview`
   - Size: 1000
   - Required: Yes
   - Click **Create**

3. Click **Create Attribute** → **String**
   - Key: `projectRequirements`
   - Size: 2000
   - Required: No
   - Click **Create**

4. Click **Create Attribute** → **String**
   - Key: `projectInstructions`
   - Size: 2000
   - Required: No
   - Click **Create**

5. Click **Create Attribute** → **Boolean**
   - Key: `requiresProject`
   - Required: Yes
   - Default: false
   - Click **Create**

### Create Indexes for Courses:

Go to **Indexes** tab:

1. Click **Create Index**
   - Index Key: `requiresProject_index`
   - Type: Key
   - Attributes: `requiresProject` (ASC)
   - Click **Create**

### Set Permissions for Courses:

Go to **Settings** tab of the `courses` collection:

1. Scroll to **Permissions** section
2. Click **Add Role** for each permission type:

**Read Access:**
- Click **Add Role** → Select **Any** → Click **Add**

**Create Access:**
- Click **Add Role** → Select **Users** → Click **Add**

**Update Access:**
- Click **Add Role** → Select **Users** → Click **Add**

**Delete Access:**
- Click **Add Role** → Select **Users** → Click **Add**

---

## Step 2: Create Modules Collection

1. Click **Create Collection**
2. **Collection ID**: `modules` (must be exactly this)
3. **Collection Name**: `Modules`
4. Click **Create**

### Add Attributes to Modules:

1. **String** attribute:
   - Key: `courseId`
   - Size: 255
   - Required: Yes

2. **String** attribute:
   - Key: `title`
   - Size: 255
   - Required: Yes

3. **Integer** attribute:
   - Key: `order`
   - Min: 0
   - Max: 1000
   - Required: Yes

### Set Permissions for Modules:

**Read Access:** Any
**Create Access:** Users
**Update Access:** Users
**Delete Access:** Users

---

## Step 3: Create Videos Collection

1. Click **Create Collection**
2. **Collection ID**: `videos` (must be exactly this)
3. **Collection Name**: `Videos`
4. Click **Create**

### Add Attributes to Videos:

1. **String** - Key: `moduleId`, Size: 255, Required: Yes
2. **String** - Key: `title`, Size: 255, Required: Yes
3. **String** - Key: `description`, Size: 1000, Required: Yes
4. **String** - Key: `youtubeLink`, Size: 500, Required: Yes
5. **Integer** - Key: `order`, Min: 0, Max: 1000, Required: Yes

### Set Permissions for Videos:

**Read Access:** Any
**Create Access:** Users
**Update Access:** Users
**Delete Access:** Users

### Create Indexes for Videos:

Go to **Indexes** tab:

1. Click **Create Index**
   - Index Key: `moduleId_order_index`
   - Type: Key
   - Attributes: `moduleId` (ASC), `order` (ASC)
   - Click **Create**

---

## Step 4: Create User Progress Collection

1. Click **Create Collection**
2. **Collection ID**: `user_progress` (must be exactly this)
3. **Collection Name**: `User Progress`
4. Click **Create**

### Add Attributes to User Progress:

1. **String** - Key: `userId`, Size: 255, Required: Yes
2. **String** - Key: `videoId`, Size: 255, Required: Yes
3. **Boolean** - Key: `completed`, Required: Yes
4. **DateTime** - Key: `completedAt`, Required: No

### Set Permissions for User Progress:

**Read Access:** Any
**Create Access:** Users
**Update Access:** Users
**Delete Access:** Users

### Create Indexes for User Progress:

1. **Index Key**: `userId_index`
   - Type: Key
   - Attributes: `userId` (ASC)

---

## Step 5: Create Project Submissions Collection

1. Click **Create Collection**
2. **Collection ID**: `project_submissions` (must be exactly this)
3. **Collection Name**: `Project Submissions`
4. Click **Create**

### Add Attributes to Project Submissions:

1. **String** - Key: `userId`, Size: 255, Required: Yes
2. **String** - Key: `courseId`, Size: 255, Required: Yes
3. **String** - Key: `projectLink`, Size: 500, Required: Yes
4. **DateTime** - Key: `submittedAt`, Required: Yes
5. **String** - Key: `status`, Size: 50, Required: Yes
   (Note: Always set to "pending" when creating. Values: "pending", "approved", "rejected")
6. **String** - Key: `adminNotes`, Size: 1000, Required: No
7. **Boolean** - Key: `certified`, Required: No, Default: false

### Set Permissions for Project Submissions:

**Read Access:** Any
**Create Access:** Users
**Update Access:** Users
**Delete Access:** Users

---

## Step 4: Create User Progress Collection

1. Click **Create Collection**
2. **Collection ID**: `user_progress` (must be exactly this)
3. **Collection Name**: `User Progress`
4. Click **Create**

### Add Attributes to User Progress:

1. **String** - Key: `userId`, Size: 255, Required: Yes
2. **String** - Key: `videoId`, Size: 255, Required: Yes
3. **Boolean** - Key: `completed`, Required: Yes, Default: false
4. **String** - Key: `completedAt`, Size: 100, Required: No

### Set Permissions for User Progress:

**Read Access:** Users
**Create Access:** Users
**Update Access:** Users
**Delete Access:** Users

---

## Step 5: Verify All Collections

Go back to your database and verify you have these 5 collections:
- ✓ users
- ✓ courses
- ✓ modules
- ✓ videos
- ✓ user_progress

---

## Important Notes:

### Collection IDs Must Match Exactly:
- `courses` (not "Courses" or "course")
- `modules` (not "Modules" or "module")
- `videos` (not "Videos" or "video")
- `user_progress` (not "User Progress" or "userProgress")

### Permissions Explained:

**Any** = Anyone can access (even without login)
**Users** = Any authenticated user can access
**User:[USER_ID]** = Only specific user can access their own data

For this platform:
- Courses, Modules, Videos: Anyone can READ (so users can browse)
- Courses, Modules, Videos: Only authenticated users can CREATE/UPDATE/DELETE (admin will be authenticated)
- User Progress: Only authenticated users can access (to track their own progress)

### Admin Access:

Since the admin is a logged-in user, they will have full access to create/update/delete courses, modules, and videos because we set permissions to "Users" (any authenticated user).

If you want ONLY admin to manage courses:
1. You would need to use Appwrite Functions or Server SDK
2. Or manually manage permissions per document
3. For now, "Users" permission works since only admin will be creating content

---

## Troubleshooting:

**404 Error - Collection not found:**
- Make sure collection ID matches exactly (case-sensitive)
- Verify collection exists in the database

**401 Error - Not authorized:**
- Check permissions are set correctly
- Make sure you're logged in
- Verify the user has the right role

**Attribute errors:**
- Make sure all required attributes are created
- Check attribute types match (String, Integer, Boolean)
- Verify attribute keys are spelled correctly

---

## After Setup:

1. Restart your development server: `npm run dev`
2. Clear browser cache (Ctrl + Shift + Delete)
3. Login as admin
4. Try adding a course

The errors should be resolved!


---

## Step 6: Create Indexes for Better Performance

Indexes significantly improve query performance, especially when you have many courses, modules, and videos.

### Courses Collection Indexes:

1. Go to `courses` collection → **Indexes** tab
2. Create index for search:
   - Key: `title_search`
   - Type: **Fulltext**
   - Attributes: `title`
   - Order: ASC

### Modules Collection Indexes:

1. Go to `modules` collection → **Indexes** tab
2. Create index for courseId lookup:
   - Key: `courseId_index`
   - Type: **Key**
   - Attributes: `courseId`
   - Order: ASC
3. Create index for ordering:
   - Key: `order_index`
   - Type: **Key**
   - Attributes: `order`
   - Order: ASC

### Videos Collection Indexes:

1. Go to `videos` collection → **Indexes** tab
2. Create index for moduleId lookup:
   - Key: `moduleId_index`
   - Type: **Key**
   - Attributes: `moduleId`
   - Order: ASC
3. Create index for ordering:
   - Key: `order_index`
   - Type: **Key**
   - Attributes: `order`
   - Order: ASC

### User Progress Collection Indexes:

1. Go to `user_progress` collection → **Indexes** tab
2. Create index for userId lookup:
   - Key: `userId_index`
   - Type: **Key**
   - Attributes: `userId`
   - Order: ASC
3. Create index for videoId lookup:
   - Key: `videoId_index`
   - Type: **Key**
   - Attributes: `videoId`
   - Order: ASC

### Why Indexes Matter:

- **Without indexes**: Appwrite scans every document to find matches (slow for large datasets)
- **With indexes**: Appwrite uses optimized data structures for instant lookups
- **Performance gain**: 10x-100x faster queries with thousands of records

### Index Types:

- **Key**: For exact matches and sorting (use for IDs and order fields)
- **Fulltext**: For text search (use for searchable text fields like titles)
- **Unique**: Ensures no duplicate values (not needed for our use case)

---

## Performance Tips:

1. Always create indexes on fields you query frequently
2. Create indexes on foreign keys (courseId, moduleId, userId, videoId)
3. Create indexes on fields you sort by (order)
4. Use fulltext indexes for search functionality
5. Monitor query performance in Appwrite Console

With these indexes, your platform will load quickly even with thousands of courses!


**Read Access:** Any
**Create Access:** Users
**Update Access:** Users
**Delete Access:** Users

### Create Indexes for Project Submissions:

1. **Index Key**: `userId_courseId_index`
   - Type: Key
   - Attributes: `userId` (ASC), `courseId` (ASC)

2. **Index Key**: `status_index`
   - Type: Key
   - Attributes: `status` (ASC)

3. **Index Key**: `userId_index`
   - Type: Key
   - Attributes: `userId` (ASC)

4. **Index Key**: `courseId_index`
   - Type: Key
   - Attributes: `courseId` (ASC)

---

## Environment Variables Required

Add these to your `.env` file:

```
VITE_APPWRITE_COURSES_COLLECTION_ID=courses
VITE_APPWRITE_MODULES_COLLECTION_ID=modules
VITE_APPWRITE_VIDEOS_COLLECTION_ID=videos
VITE_APPWRITE_USER_PROGRESS_COLLECTION_ID=user_progress
VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID=project_submissions
```

---

## Summary

You should now have 5 collections:
1. ✅ courses - Stores course information
2. ✅ modules - Stores modules within courses
3. ✅ videos - Stores video content
4. ✅ user_progress - Tracks user video completion
5. ✅ project_submissions - Tracks project submissions and certifications

All collections have proper permissions and indexes for optimal performance!
