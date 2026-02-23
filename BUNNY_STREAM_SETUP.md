# Bunny.net Stream Integration Guide

## Why Bunny.net?

- Cost-effective video hosting
- Global CDN with fast delivery
- Easy integration
- Built-in analytics
- Adaptive bitrate streaming

## Setup Steps

### 1. Create Bunny.net Account
1. Go to https://bunny.net
2. Sign up and verify email
3. Go to Stream section

### 2. Create Stream Library
1. Click "Add Stream Library"
2. Name: "JCI Bogura Videos"
3. Select regions (Asia recommended)
4. Note your Library ID

### 3. Upload Videos
1. Click "Upload Video"
2. Add title and upload file
3. Wait for processing
4. Copy the Video ID (GUID format)

### 4. Video Link Format

Store in database using one of these formats:

**Bunny Format:**
```
bunny:LIBRARY_ID/VIDEO_ID
```
Example: `bunny:123456/a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Full URL:**
```
https://iframe.mediadelivery.net/embed/LIBRARY_ID/VIDEO_ID
```

**YouTube (still supported):**
```
https://www.youtube.com/watch?v=VIDEO_ID
```

### 5. Environment Variables

Add to `.env`:
```env
VITE_BUNNY_LIBRARY_ID=your_library_id
```

## Usage in Admin Panel

When adding videos:
1. Upload video to Bunny.net first
2. Copy the Video ID
3. In admin panel, enter: `bunny:LIBRARY_ID/VIDEO_ID`
4. Or paste full Bunny URL
5. Platform auto-detects format

## Pricing Example

For 100 videos (10 min each, 1080p):
- Storage: $0.50/month
- Encoding: $10 (one-time)
- Streaming (1000 views): $5/month

## Support

- Docs: https://docs.bunny.net/docs/stream
- Email: support@bunny.net
