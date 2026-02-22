# Setup Status Checker

## Current Error: 400 Bad Request

This error means Appwrite is rejecting requests because the database schema doesn't match what the code expects.

## What You Need to Do:

### Step 1: Create Project Submissions Collection

1. Go to Appwrite Console: https://cloud.appwrite.io/console
2. Navigate to: **Databases** → **jcibogura_db** → **Create Collection**
3. Set:
   - Collection ID: `project_submissions`
   - Collection Name: `Project Submissions`
4. Click **Create**

### Step 2: Add Attributes to Project Submissions Collection

Click on the `project_submissions` collection, then **Attributes** tab:

1. **String** attribute:
   - Key: `userId`
   - Size: 255
   - Required: Yes
   - Click **Create**

2. **String** attribute:
   - Key: `courseId`
   - Size: 255
   - Required: Yes

3. **String** attribute:
   - Key: `projectLink`
   - Size: 500
   - Required: Yes

4. **DateTime** attribute:
   - Key: `submittedAt`
   - Required: Yes

5. **String** attribute:
   - Key: `status`
   - Size: 50
   - Required: Yes

6. **String** attribute:
   - Key: `adminNotes`
   - Size: 1000
   - Required: No

7. **Boolean** attribute:
   - Key: `certified`
   - Required: No
   - Default: false

### Step 3: Set Permissions for Project Submissions

Go to **Settings** tab:

- **Read Access**: Click **Add Role** → Select **Any** → Click **Add**
- **Create Access**: Click **Add Role** → Select **Users** → Click **Add**
- **Update Access**: Click **Add Role** → Select **Users** → Click **Add**
- **Delete Access**: Click **Add Role** → Select **Users** → Click **Add**

### Step 4: Create Indexes for Project Submissions

Go to **Indexes** tab:

1. Click **Create Index**:
   - Index Key: `userId_courseId_index`
   - Type: Key
   - Attributes: Select `userId` (ASC), then add `courseId` (ASC)
   - Click **Create**

2. Click **Create Index**:
   - Index Key: `status_index`
   - Type: Key
   - Attributes: Select `status` (ASC)
   - Click **Create**

### Step 5: Update Courses Collection

Go to your existing `courses` collection → **Attributes** tab:

1. **Boolean** attribute:
   - Key: `requiresProject`
   - Required: No
   - Default: false
   - Click **Create**

2. **String** attribute:
   - Key: `projectRequirements`
   - Size: 2000
   - Required: No

3. **String** attribute:
   - Key: `projectInstructions`
   - Size: 2000
   - Required: No

### Step 6: Create Indexes for Courses Collection

Go to `courses` collection → **Indexes** tab:

1. Click **Create Index**:
   - Index Key: `requiresProject_index`
   - Type: Key
   - Attributes: Select `requiresProject` (ASC)
   - Click **Create**

## After Setup:

1. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
2. The 400 errors should be gone
3. You can now:
   - Add project requirements to courses
   - Students can submit projects
   - View submissions in Admin Dashboard

## Testing the Setup:

1. **As Admin**:
   - Login to admin panel
   - Create or edit a course
   - Check "This course requires a project submission"
   - Add requirements and instructions
   - Save

2. **As Student**:
   - Complete a course with project requirement
   - Submit a project link
   - Check status in course page

3. **As Admin**:
   - Go to "Project Submissions" tab
   - Review and approve/reject submissions

## Still Getting Errors?

Check the browser console (F12) for detailed error messages. Common issues:

- **Collection not found**: Make sure Collection ID is exactly `project_submissions`
- **Attribute not found**: Double-check all attribute names match exactly
- **Permission denied**: Verify permissions are set correctly
- **Invalid data type**: Ensure DateTime is used for `submittedAt`, not String

## Need Help?

The code now handles missing collections gracefully, so:
- If collection doesn't exist, project features simply won't show
- No errors will break the main functionality
- You can set up the collection whenever ready


### Step 6: Create Additional Indexes for Better Performance

#### For project_submissions collection:

3. Click **Create Index**:
   - Index Key: `userId_index`
   - Type: Key
   - Attributes: Select `userId` (ASC)
   - Click **Create**

4. Click **Create Index**:
   - Index Key: `courseId_index`
   - Type: Key
   - Attributes: Select `courseId` (ASC)
   - Click **Create**

#### For courses collection:

Go to `courses` collection → **Indexes** tab:

1. Click **Create Index**:
   - Index Key: `requiresProject_index`
   - Type: Key
   - Attributes: Select `requiresProject` (ASC)
   - Click **Create**

---

## Summary of All Indexes

After setup, you should have these indexes:

### courses collection:
- `requiresProject_index` (requiresProject ASC)

### modules collection:
- `courseId_order_index` (courseId ASC, order ASC)

### videos collection:
- `moduleId_order_index` (moduleId ASC, order ASC)

### user_progress collection:
- `userId_index` (userId ASC)

### project_submissions collection:
- `userId_courseId_index` (userId ASC, courseId ASC)
- `status_index` (status ASC)
- `userId_index` (userId ASC) - for finding all submissions by user
- `courseId_index` (courseId ASC) - for finding all submissions for a course
