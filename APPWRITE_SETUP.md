# Appwrite Setup Guide

This guide will help you set up Appwrite for the JCI Bogura Career Portal application.

## Prerequisites

- An Appwrite Cloud account (https://cloud.appwrite.io)
- Project ID: `699b414e0022ac3ae5e0`
- Project Name: `jcibogura`
- Endpoint: `https://sgp.cloud.appwrite.io/v1`

## Step 1: Access Your Appwrite Project

1. Go to https://cloud.appwrite.io
2. Log in to your account
3. Select the project `jcibogura` (ID: 699b414e0022ac3ae5e0)

## Step 2: Create Database

1. In the left sidebar, click on **Databases**
2. Click **Create Database**
3. Enter Database ID: `jcibogura_db`
4. Enter Database Name: `JCI Bogura Database`
5. Click **Create**

## Step 3: Create Users Collection

1. Inside the `jcibogura_db` database, click **Create Collection**
2. Enter Collection ID: `users`
3. Enter Collection Name: `Users`
4. Click **Create**

## Step 4: Add Attributes to Users Collection

Click on the `users` collection and add the following attributes:

### Required Attributes:

1. **userId**
   - Type: String
   - Size: 255
   - Required: Yes
   - Array: No

2. **firstName**
   - Type: String
   - Size: 100
   - Required: Yes
   - Array: No

3. **lastName**
   - Type: String
   - Size: 100
   - Required: Yes
   - Array: No

4. **age**
   - Type: Integer
   - Min: 1
   - Max: 150
   - Required: Yes
   - Array: No

5. **profession**
   - Type: String
   - Size: 50
   - Required: Yes
   - Array: No

6. **institute**
   - Type: String
   - Size: 255
   - Required: No
   - Array: No
   - Default: null

7. **company**
   - Type: String
   - Size: 255
   - Required: No
   - Array: No
   - Default: null

8. **position**
   - Type: String
   - Size: 100
   - Required: No
   - Array: No
   - Default: null

9. **address**
   - Type: String
   - Size: 500
   - Required: Yes
   - Array: No

10. **phoneNumber**
    - Type: String
    - Size: 20
    - Required: Yes
    - Array: No

11. **email**
    - Type: String
    - Size: 255
    - Required: Yes
    - Array: No

## Step 5: Configure Collection Permissions

1. Go to the **Settings** tab of the `users` collection
2. Under **Permissions**, configure as follows:

### Read Access:
- Add Role: **Users** (Any authenticated user can read)
- Or more restrictive: **User:[USER_ID]** (Users can only read their own data)

### Create Access:
- Add Role: **Users** (Any authenticated user can create)

### Update Access:
- Add Role: **User:[USER_ID]** (Users can only update their own data)

### Delete Access:
- Add Role: **User:[USER_ID]** (Users can only delete their own data)
- Or: Leave empty if you don't want users to delete their profiles

## Step 6: Create Admin Account

1. In the left sidebar, click on **Auth**
2. Click **Create User**
3. Enter Email: `admin@jcibogura.com` (or your preferred admin email)
4. Enter Password: (Choose a strong password)
5. Enter Name: `Admin`
6. Click **Create**

**Important:** Update the `.env` file with your admin email:
```
VITE_ADMIN_EMAIL=admin@jcibogura.com
```

## Step 7: Configure Authentication Settings

1. Go to **Auth** in the left sidebar
2. Click on **Settings**
3. Configure the following:

### Session Settings:
- Session Length: 31536000 seconds (1 year) or as needed
- Enable: Email/Password authentication

### Security:
- Enable: Password History (optional)
- Enable: Password Dictionary (optional)
- Enable: Personal Data (optional)

### Email Templates (Optional):
- Customize email verification templates
- Customize password recovery templates

## Step 8: Update Environment Variables

Make sure your `.env` file has the correct values:

```env
VITE_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=699b414e0022ac3ae5e0
VITE_APPWRITE_DATABASE_ID=jcibogura_db
VITE_APPWRITE_USERS_COLLECTION_ID=users
VITE_ADMIN_EMAIL=admin@jcibogura.com
```

## Step 9: Test the Setup

1. Start your development server: `npm run dev`
2. Open the browser console and check for: "Appwrite connection successful!"
3. Try registering a new user
4. Try logging in with the registered user
5. Try logging in as admin with the admin credentials

## Troubleshooting

### Connection Failed
- Verify your Project ID is correct
- Check if the endpoint URL is accessible
- Ensure your internet connection is stable

### Permission Denied Errors
- Check collection permissions in Appwrite Console
- Ensure the user is authenticated before accessing data
- Verify the database and collection IDs are correct

### Registration Fails
- Check if all required attributes are created in the collection
- Verify attribute types match the data being sent
- Check browser console for detailed error messages

### Admin Login Not Working
- Verify the admin email in `.env` matches the email in Appwrite Auth
- Ensure the admin account exists in Appwrite Auth
- Check if the password is correct

## Additional Configuration (Optional)

### Enable Email Verification
1. Go to **Auth** > **Settings**
2. Enable **Email Verification**
3. Users will need to verify their email before accessing the app

### Enable Password Recovery
1. Go to **Auth** > **Settings**
2. Configure **Password Recovery** settings
3. Users can reset their password via email

### Add More Collections
As your app grows, you may need additional collections for:
- Job postings
- Applications
- Events
- Announcements

## Security Best Practices

1. **Never commit `.env` file to version control**
   - Add `.env` to `.gitignore`

2. **Use strong passwords for admin accounts**

3. **Regularly review and update permissions**

4. **Enable rate limiting in Appwrite Console**

5. **Monitor authentication logs for suspicious activity**

6. **Keep Appwrite SDK updated**
   ```bash
   npm update appwrite
   ```

## Support

For more information, visit:
- Appwrite Documentation: https://appwrite.io/docs
- Appwrite Discord: https://appwrite.io/discord
- Appwrite GitHub: https://github.com/appwrite/appwrite

---

**Last Updated:** February 2026
**Project:** JCI Bogura Career Portal


---

## Course Platform Collections Setup

### Step 10: Create Courses Collection

1. In the `jcibogura_db` database, click **Create Collection**
2. Collection ID: `courses`
3. Collection Name: `Courses`
4. Add these attributes:

- **title** (String, Size: 255, Required: Yes)
- **overview** (String, Size: 1000, Required: Yes)

**Permissions:**
- Read: Any
- Create: Admin only
- Update: Admin only
- Delete: Admin only

### Step 11: Create Modules Collection

1. Create Collection ID: `modules`
2. Collection Name: `Modules`
3. Add these attributes:

- **courseId** (String, Size: 255, Required: Yes)
- **title** (String, Size: 255, Required: Yes)
- **order** (Integer, Required: Yes)

**Permissions:**
- Read: Any
- Create: Admin only
- Update: Admin only
- Delete: Admin only

### Step 12: Create Videos Collection

1. Create Collection ID: `videos`
2. Collection Name: `Videos`
3. Add these attributes:

- **moduleId** (String, Size: 255, Required: Yes)
- **title** (String, Size: 255, Required: Yes)
- **description** (String, Size: 1000, Required: Yes)
- **youtubeLink** (String, Size: 500, Required: Yes)
- **order** (Integer, Required: Yes)

**Permissions:**
- Read: Any
- Create: Admin only
- Update: Admin only
- Delete: Admin only

### Step 13: Create User Progress Collection

1. Create Collection ID: `user_progress`
2. Collection Name: `User Progress`
3. Add these attributes:

- **userId** (String, Size: 255, Required: Yes)
- **videoId** (String, Size: 255, Required: Yes)
- **completed** (Boolean, Required: Yes, Default: false)
- **completedAt** (String, Size: 100, Required: No)

**Permissions:**
- Read: Users (authenticated users can read their own progress)
- Create: Users
- Update: Users
- Delete: Users

### Step 14: Enable Search on Courses

To enable full-text search on the courses collection:

**Method 1: Using Indexes (Recommended)**

1. Go to the `courses` collection in Appwrite Console
2. Click on the **Indexes** tab (next to Attributes)
3. Click **Create Index**
4. Configure the index:
   - **Index Key**: `title_search` (or any name you prefer)
   - **Index Type**: Select **Fulltext**
   - **Attributes**: Select `title` from the dropdown
   - **Order**: ASC (ascending)
5. Click **Create**
6. Wait for the index to be created (status will show as "Available")

**Method 2: Create Index for Multiple Fields**

If you want to search both title and overview:

1. Create first index for title (follow steps above)
2. Create another index:
   - **Index Key**: `overview_search`
   - **Index Type**: **Fulltext**
   - **Attributes**: `overview`
   - **Order**: ASC
3. Click **Create**

**Note:** The search functionality in the app will work with client-side filtering even without full-text search indexes, but indexes make it much faster for large datasets.

**Alternative: If Full-Text Search is Not Available**

If your Appwrite version doesn't support full-text search or you encounter issues:
- The app already includes client-side filtering as a fallback
- All courses are loaded and filtered in the browser
- This works well for small to medium-sized course catalogs (up to a few hundred courses)
