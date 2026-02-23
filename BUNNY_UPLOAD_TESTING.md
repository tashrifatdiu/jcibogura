# Testing Bunny.net Direct Upload Feature

## ✨ New Feature: Upload Videos Directly from Admin Panel!

You can now upload videos directly to Bunny.net from your admin dashboard without leaving the platform!

---

## 🧪 How to Test

### Step 1: Access Admin Dashboard

1. Open http://localhost:5173/
2. Click "Admin Login" or go to http://localhost:5173/admin-login
3. Log in with admin credentials

### Step 2: Navigate to Video Upload

1. Click on any course (or create a new one)
2. Click on a module (or create a new module)
3. Click "Add Video" button

### Step 3: Upload Video to Bunny.net

You'll see a new button: **"📤 Upload to Bunny.net"**

1. Click the "Upload to Bunny.net" button
2. A modal will appear with upload form
3. Fill in:
   - **Video Title**: Enter a descriptive title
   - **Video File**: Click to select or drag & drop your video file
4. Click "Upload Video"

### Step 4: Wait for Upload

- The upload process has 2 stages:
  1. **Creating video entry** (a few seconds)
  2. **Uploading video file** (depends on file size)
- Don't close the window during upload!
- You'll see a progress indicator

### Step 5: Complete the Form

After upload completes:
- Title and Video Link will be auto-filled
- Add a **Description** for the video
- Adjust **Order** if needed
- Click "Add Video" to save

### Step 6: Test Playback

1. Log out from admin
2. Log in as a regular user
3. Navigate to the course
4. Click on the video you just uploaded
5. Video should play using Bunny.net player!

---

## 📝 What Happens Behind the Scenes

1. **Upload to Bunny.net**: Video is uploaded to your Bunny.net library (ID: 604606)
2. **Get Video ID**: Bunny.net returns a unique Video ID (GUID)
3. **Auto-fill Form**: Video link is automatically formatted as `bunny:604606/VIDEO_ID`
4. **Save to Appwrite**: Video information is saved to your database
5. **Ready to Play**: Video is immediately available for students

---

## 🎬 Supported Video Formats

- ✅ MP4 (recommended)
- ✅ MOV
- ✅ AVI
- ✅ MKV
- ✅ WebM
- ✅ FLV

**Max file size**: 2GB per video

---

## ⚡ Features

### Automatic Processing
- ✅ Video is automatically encoded by Bunny.net
- ✅ Multiple quality options generated (360p, 720p, 1080p)
- ✅ Adaptive bitrate streaming enabled
- ✅ Thumbnails generated automatically

### User-Friendly
- ✅ Drag & drop support
- ✅ Progress indicator
- ✅ Auto-fill form fields
- ✅ Error handling
- ✅ File validation

### Seamless Integration
- ✅ No need to leave admin panel
- ✅ No manual copy-paste of Video IDs
- ✅ Automatic format conversion
- ✅ Instant playback after upload

---

## 🔍 Testing Checklist

- [ ] Admin login works
- [ ] "Upload to Bunny.net" button appears
- [ ] Upload modal opens correctly
- [ ] File selection works
- [ ] Title auto-fills from filename
- [ ] Upload progress shows
- [ ] Form auto-fills after upload
- [ ] Video saves to database
- [ ] Video plays for students
- [ ] Video quality is good
- [ ] Mobile playback works

---

## 🐛 Troubleshooting

### Upload Button Not Showing
- Check if you're logged in as admin
- Verify you're in "Add Video" mode (not "Edit Video")
- Refresh the page

### Upload Fails
- Check your internet connection
- Verify Bunny.net API key in `.env` file
- Check browser console for errors (F12)
- Ensure video file is under 2GB

### Video Not Playing
- Wait a few minutes for Bunny.net to process the video
- Check if Video ID was saved correctly in database
- Verify Library ID (604606) is correct

### Form Not Auto-Filling
- Check browser console for errors
- Verify upload completed successfully
- Try refreshing and uploading again

---

## 💡 Tips

1. **Use descriptive titles**: They help organize your videos
2. **Compress large videos**: Smaller files upload faster
3. **Test with short video first**: Verify everything works
4. **Wait for processing**: Large videos may take time to process
5. **Check video quality**: Preview before making it live

---

## 🔄 Alternative Methods

You can still add videos the old way:

### Method 1: Manual Bunny.net Upload
1. Upload to Bunny.net dashboard
2. Copy Video ID
3. Paste in admin panel: `VIDEO_ID` or `bunny:604606/VIDEO_ID`

### Method 2: YouTube Videos
1. Upload to YouTube
2. Copy YouTube URL
3. Paste in admin panel: `https://www.youtube.com/watch?v=VIDEO_ID`

Both methods still work! The new upload feature is just more convenient.

---

## 📊 What to Monitor

After uploading videos, check:

1. **Bunny.net Dashboard**: https://dash.bunny.net
   - Verify video appears in library
   - Check processing status
   - Monitor storage usage

2. **Admin Dashboard**:
   - Verify video appears in course
   - Check video order is correct
   - Test edit/delete functions

3. **Student View**:
   - Test video playback
   - Check loading speed
   - Verify quality options

---

## 🎯 Next Steps

1. ✅ Test upload with a short video (< 100MB)
2. ✅ Verify playback works
3. ✅ Test on mobile device
4. ✅ Upload your course videos
5. ✅ Monitor Bunny.net usage

---

## 📞 Support

If you encounter issues:
- Check browser console (F12)
- Review Bunny.net dashboard
- Verify environment variables in `.env`
- Check network tab for failed requests

---

**Server Running**: http://localhost:5173/
**Admin Login**: http://localhost:5173/admin-login

**Happy Testing!** 🚀
