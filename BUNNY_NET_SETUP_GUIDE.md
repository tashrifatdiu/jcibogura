# Bunny.net Video Streaming Setup Guide

Complete guide to integrate Bunny.net video streaming into your JCI Bogura Learning Platform.

---

## 📋 Prerequisites

- ✅ Bunny.net account (you already have this!)
- ✅ Videos ready to upload
- ✅ Admin access to your learning platform

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Stream Library

1. **Log in to Bunny.net**
   - Go to https://dash.bunny.net
   - Sign in with your credentials

2. **Navigate to Stream**
   - Click **"Stream"** in the left sidebar
   - You'll see the Stream dashboard

3. **Create New Library**
   - Click **"Add Stream Library"** button
   - Fill in the form:
     - **Name**: `JCI Bogura Videos`
     - **Replication Regions**: 
       - ✅ Singapore (closest to Bangladesh)
       - ✅ India (if available)
       - ✅ Hong Kong (optional)
     - **Player Settings**: Keep default for now
   - Click **"Add Library"**

4. **Note Your Library ID**
   - After creation, you'll see your library
   - At the top of the page, find your **Library ID** (e.g., `123456`)
   - **📝 Write this down!** You'll need it later

---

### Step 2: Upload Your First Video

1. **Enter Your Library**
   - Click on your library name (`JCI Bogura Videos`)

2. **Upload Video**
   - Click **"Upload Video"** button
   - Click **"Select File"** or drag and drop
   - Choose your video file

3. **Add Video Details**
   - **Title**: Enter descriptive title (e.g., "Introduction to Digital Marketing")
   - **Description**: Optional but recommended
   - **Collection**: Leave default or create a new one

4. **Wait for Processing**
   - Upload will start automatically
   - Processing time depends on video length:
     - 5 min video ≈ 2-3 minutes
     - 30 min video ≈ 10-15 minutes
   - You'll see a progress bar

5. **Get Video ID**
   - Once processed, click on the video
   - Copy the **Video ID** (GUID format)
   - Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
   - **📝 Save this Video ID!**

---

### Step 3: Format Your Video Link

You have **two options** for the video link format:

#### Option 1: Simple Format (Recommended) ⭐
```
bunny:LIBRARY_ID/VIDEO_ID
```

**Example:**
```
bunny:123456/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

#### Option 2: Full URL Format
```
https://iframe.mediadelivery.net/embed/LIBRARY_ID/VIDEO_ID
```

**Example:**
```
https://iframe.mediadelivery.net/embed/123456/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**💡 Tip:** Use Option 1 (simple format) - it's cleaner and easier to manage!

---

### Step 4: Add Video to Your Course

1. **Access Admin Dashboard**
   - Go to your website
   - Log in as admin
   - Navigate to Admin Dashboard

2. **Select Course**
   - Click on the course you want to add video to
   - Or create a new course

3. **Add Module** (if needed)
   - Create a module for organizing videos
   - Example: "Module 1: Introduction"

4. **Add Video**
   - Click "Add Video" in the module
   - Fill in the form:
     - **Title**: Video title
     - **Video Link**: Paste your Bunny link
       - `bunny:123456/a1b2c3d4-e5f6-7890-abcd-ef1234567890`
     - **Description**: Video description
     - **Order**: Set the order number
   - Click **"Save"**

5. **Verify**
   - The video should now appear in your course

---

### Step 5: Test the Video

1. **Log Out from Admin**
   - Log out of admin account

2. **Log In as Student**
   - Use a regular user account
   - Or register a new test account

3. **Navigate to Course**
   - Go to the course with your video
   - Click on the module
   - Click on the video

4. **Check Playback**
   - Video should load and play smoothly
   - Player controls should work
   - Quality should adjust automatically

---

## 📊 Understanding Bunny.net Dashboard

### Where to Find Key Information:

#### Library ID
- **Location**: Stream → Your Library → Top of page
- **Format**: Number (e.g., `123456`)
- **Use**: Needed for every video link

#### Video ID
- **Location**: Stream → Your Library → Click video → Video details
- **Format**: GUID (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- **Use**: Unique identifier for each video

#### Embed Code
- **Location**: Stream → Your Library → Click video → "Embed" tab
- **Contains**: Full iframe code
- **Use**: Can extract Library ID and Video ID from here

#### Analytics
- **Location**: Stream → Your Library → "Analytics" tab
- **Shows**: Views, watch time, geographic data
- **Use**: Track video performance

---

## 🎬 Complete Example Workflow

Let's walk through adding a complete course video:

### Scenario: Adding "Lesson 1 - Introduction to SEO"

**Step 1: Upload to Bunny.net**
```
1. Go to Bunny.net Stream
2. Click "Upload Video"
3. Select file: "lesson-1-intro-to-seo.mp4"
4. Title: "Lesson 1 - Introduction to SEO"
5. Wait for processing (5 minutes)
6. Video ID received: abc123-def456-ghi789
```

**Step 2: Create Video Link**
```
Library ID: 123456
Video ID: abc123-def456-ghi789
Final Link: bunny:123456/abc123-def456-ghi789
```

**Step 3: Add to Platform**
```
1. Admin Dashboard → Courses
2. Select "Digital Marketing Course"
3. Module: "SEO Basics"
4. Add Video:
   - Title: "Lesson 1 - Introduction to SEO"
   - Link: bunny:123456/abc123-def456-ghi789
   - Description: "Learn the fundamentals of SEO"
   - Order: 1
5. Save
```

**Step 4: Test**
```
1. Log in as student
2. Go to Digital Marketing Course
3. Click "SEO Basics" module
4. Click "Lesson 1 - Introduction to SEO"
5. Video plays! ✅
```

---

## 💰 Pricing Information

### Bunny.net Stream Costs (2024)

| Item | Cost |
|------|------|
| Storage | $0.01/GB/month |
| Encoding | $0.01/minute |
| Streaming | $0.01/GB |

### Example Cost Calculation

**For 100 videos (10 minutes each, 1080p):**

- **Storage**: 
  - ~50GB total
  - Cost: $0.50/month

- **Encoding** (one-time):
  - 1000 minutes total
  - Cost: $10.00

- **Streaming** (1000 views/month):
  - ~500GB bandwidth
  - Cost: $5.00/month

**Total Monthly Cost**: ~$5.50/month

**💡 Very affordable compared to YouTube Premium or Vimeo!**

---

## ✨ Features You Get

### Included Features:
- ✅ Adaptive bitrate streaming (auto quality adjustment)
- ✅ Global CDN delivery (fast loading worldwide)
- ✅ Responsive player (works on all devices)
- ✅ Mobile-friendly playback
- ✅ Thumbnail generation
- ✅ Multiple quality options (360p, 720p, 1080p, 4K)
- ✅ Fullscreen support
- ✅ Picture-in-picture mode
- ✅ Analytics dashboard
- ✅ Embed protection
- ✅ HTTPS delivery

### Advanced Features (Optional):
- 🔒 Token authentication (private videos)
- 📊 Detailed analytics
- 🎨 Custom player branding
- 📱 Mobile app SDK
- 🌍 Geo-blocking
- ⏱️ Video chapters
- 🔐 DRM protection

---

## 🔧 Troubleshooting

### Video Not Playing

**Problem**: Video doesn't load or shows error

**Solutions**:
1. ✅ Check Video ID is correct
2. ✅ Verify Library ID matches
3. ✅ Ensure video processing is complete in Bunny.net
4. ✅ Check browser console for errors (F12)
5. ✅ Try in incognito/private window
6. ✅ Clear browser cache

### Slow Loading

**Problem**: Video takes long to start

**Solutions**:
1. ✅ Check your internet connection
2. ✅ Verify CDN regions are configured (Singapore/India)
3. ✅ Enable preloading in Bunny.net settings
4. ✅ Check video file size (compress if too large)

### Wrong Video Plays

**Problem**: Different video plays than expected

**Solutions**:
1. ✅ Verify Video ID in database
2. ✅ Check for copy-paste errors
3. ✅ Ensure format is correct: `bunny:LIBRARY_ID/VIDEO_ID`

### Quality Issues

**Problem**: Video quality is poor

**Solutions**:
1. ✅ Check source video quality
2. ✅ Verify encoding settings in Bunny.net
3. ✅ Enable adaptive bitrate streaming
4. ✅ Upload higher quality source file

---

## 🔐 Security Best Practices

### Do's ✅
- ✅ Keep API keys secure (never commit to Git)
- ✅ Use HTTPS for all video delivery
- ✅ Enable token authentication for private content
- ✅ Set up CORS properly
- ✅ Monitor usage regularly
- ✅ Use signed URLs for sensitive videos

### Don'ts ❌
- ❌ Never expose API keys in frontend code
- ❌ Don't share Library ID publicly if using private videos
- ❌ Don't skip video processing checks
- ❌ Don't use HTTP (always HTTPS)

---

## 📚 Additional Resources

### Bunny.net Documentation
- Main Docs: https://docs.bunny.net/docs/stream
- API Reference: https://docs.bunny.net/reference/api-overview
- Video Tutorials: https://bunny.net/academy

### Support Channels
- Email: support@bunny.net
- Discord: https://discord.gg/bunnycdn
- Status Page: https://status.bunny.net

### Your Platform Documentation
- Appwrite Setup: `APPWRITE_SETUP.md`
- Collections Setup: `APPWRITE_COLLECTIONS_SETUP.md`
- Project Guide: `PROJECT_CERTIFICATION_GUIDE.md`

---

## ✅ Setup Checklist

Use this checklist to track your progress:

- [ ] Created Bunny.net Stream Library
- [ ] Noted Library ID
- [ ] Uploaded first test video
- [ ] Copied Video ID
- [ ] Created video link in correct format
- [ ] Added video to course via Admin Dashboard
- [ ] Tested video playback as student
- [ ] Verified video quality
- [ ] Checked mobile playback
- [ ] Reviewed analytics dashboard

---

## 🎯 Quick Reference Card

**Copy this for easy reference:**

```
┌─────────────────────────────────────────┐
│     BUNNY.NET QUICK REFERENCE          │
├─────────────────────────────────────────┤
│ Library ID: ___________                 │
│                                         │
│ Video Link Format:                      │
│ bunny:LIBRARY_ID/VIDEO_ID              │
│                                         │
│ Example:                                │
│ bunny:123456/abc-def-ghi               │
│                                         │
│ Dashboard: dash.bunny.net              │
│ Support: support@bunny.net             │
└─────────────────────────────────────────┘
```

---

## 🚀 Next Steps

1. **Create your Stream Library** (if not done)
2. **Upload 2-3 test videos**
3. **Add them to a test course**
4. **Verify playback works**
5. **Start uploading your course videos**
6. **Monitor analytics**

---

## 💬 Need Help?

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review Bunny.net documentation
3. Contact Bunny.net support
4. Check your platform's admin dashboard for errors

**Remember**: The platform supports both YouTube and Bunny.net videos, so you can use both!

---

**Last Updated**: 2024
**Platform**: JCI Bogura Learning Platform
**Video Provider**: Bunny.net Stream
