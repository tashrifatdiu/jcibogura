# Your Bunny.net Setup - Quick Start

## ⚠️ IMPORTANT SECURITY NOTE

**Your API key has been exposed!** Please follow these steps immediately:

1. Go to https://dash.bunny.net
2. Navigate to Account → API
3. Delete the current API key
4. Generate a new API key
5. Update your `.env` file with the new key
6. Never share API keys publicly again!

---

## Your Configuration

**Library ID**: `604606`
**CDN Hostname**: `vz-5dff2573-19e.b-cdn.net`
**API Key**: `[CHANGE THIS IMMEDIATELY]`

---

## How to Add Videos to Your Platform

### Step 1: Upload Video to Bunny.net

1. Go to https://dash.bunny.net
2. Click "Stream" in sidebar
3. Click on your library
4. Click "Upload Video"
5. Upload your video file
6. Wait for processing
7. Copy the Video ID (GUID format)

Example Video ID: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### Step 2: Format Your Video Link

You have **3 options**:

#### Option 1: Just Video ID (Simplest) ⭐
```
a1b2c3d4-e5f6-7890-abcd-ef1234567890
```
The platform will automatically use your Library ID (604606)

#### Option 2: With Library ID
```
bunny:604606/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

#### Option 3: Full URL
```
https://iframe.mediadelivery.net/embed/604606/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**💡 Recommendation**: Use Option 1 (just the Video ID) - it's the simplest!

### Step 3: Add to Your Course

1. Log in to Admin Dashboard
2. Go to Courses
3. Select or create a course
4. Add or select a module
5. Click "Add Video"
6. Fill in:
   - **Title**: Your video title
   - **Video Link**: Paste the Video ID (from Step 2)
   - **Description**: Video description
   - **Order**: Video order number
7. Click Save

### Step 4: Test

1. Log out from admin
2. Log in as a student
3. Navigate to the course
4. Click on the video
5. It should play! 🎉

---

## Quick Example

Let's say you uploaded a video and got this Video ID:
```
abc123-def456-ghi789-jkl012
```

**In Admin Dashboard, Video Link field, enter:**
```
abc123-def456-ghi789-jkl012
```

That's it! The platform will automatically create:
```
https://iframe.mediadelivery.net/embed/604606/abc123-def456-ghi789-jkl012
```

---

## Video Link Formats Supported

Your platform supports all these formats:

### Bunny.net Videos:
- ✅ `VIDEO_ID` (just the GUID)
- ✅ `bunny:604606/VIDEO_ID`
- ✅ `604606/VIDEO_ID`
- ✅ `https://iframe.mediadelivery.net/embed/604606/VIDEO_ID`

### YouTube Videos (still supported):
- ✅ `https://www.youtube.com/watch?v=VIDEO_ID`
- ✅ `https://youtu.be/VIDEO_ID`

The platform automatically detects which format you're using!

---

## Environment Variables

Your `.env` file now contains:

```env
VITE_BUNNY_LIBRARY_ID=604606
VITE_BUNNY_CDN_HOSTNAME=vz-5dff2573-19e.b-cdn.net
VITE_BUNNY_API_KEY=[YOUR_NEW_API_KEY_HERE]
```

**Remember**: 
- ✅ `.env` is in `.gitignore` (won't be committed)
- ✅ When deploying to Vercel, add these as environment variables
- ❌ Never commit API keys to Git

---

## Vercel Deployment

When deploying to Vercel, add these environment variables:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `VITE_BUNNY_LIBRARY_ID` = `604606`
   - `VITE_BUNNY_CDN_HOSTNAME` = `vz-5dff2573-19e.b-cdn.net`
   - `VITE_BUNNY_API_KEY` = `[your_new_api_key]`

---

## Testing Checklist

- [ ] Uploaded test video to Bunny.net
- [ ] Copied Video ID
- [ ] Added video to course via Admin Dashboard
- [ ] Tested playback as student
- [ ] Video loads and plays correctly
- [ ] Video quality is good
- [ ] Mobile playback works

---

## Troubleshooting

### Video doesn't play
- Check Video ID is correct (no spaces, complete GUID)
- Verify video processing is complete in Bunny.net
- Check browser console for errors (F12)

### Wrong video plays
- Verify Video ID in database
- Check for copy-paste errors

### Video quality is poor
- Check source video quality in Bunny.net
- Ensure video processing completed successfully

---

## Support

- Bunny.net Dashboard: https://dash.bunny.net
- Bunny.net Docs: https://docs.bunny.net/docs/stream
- Bunny.net Support: support@bunny.net

---

## Next Steps

1. ✅ Change your API key immediately
2. ✅ Upload a test video
3. ✅ Add it to a course
4. ✅ Test playback
5. ✅ Start uploading your course videos!

---

**Your Library ID**: `604606`
**Remember**: Just paste the Video ID in the admin panel - the platform handles the rest!
