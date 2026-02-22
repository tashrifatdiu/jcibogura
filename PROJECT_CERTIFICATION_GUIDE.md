# Project Submission & Certification System Guide

## Overview

The JCI Bogura Learning Platform now includes a complete project submission and certification system. Students can submit projects after completing courses, and admins can review and certify them.

## Features

### For Students:
- Submit projects via GitHub or Google Drive links
- Track submission status (pending, approved, rejected)
- View certifications in profile
- Receive admin feedback on submissions

### For Admins:
- Add project requirements and instructions to courses
- Review all project submissions
- Approve/reject submissions with notes
- Grant certifications
- View submission statistics

## Setup Instructions

### 1. Create Appwrite Collection

Go to your Appwrite Console and create the `project_submissions` collection:

1. Navigate to: Databases → `jcibogura_db` → Create Collection
2. Collection ID: `project_submissions`
3. Collection Name: `Project Submissions`

#### Add Attributes:

1. **userId** (String, 255, Required)
2. **courseId** (String, 255, Required)
3. **projectLink** (String, 500, Required)
4. **submittedAt** (DateTime, Required)
5. **status** (String, 50, Required - always set to "pending" when creating)
6. **adminNotes** (String, 1000, Optional)
7. **certified** (Boolean, Optional, Default: false)

#### Set Permissions:

- Read Access: Any
- Create Access: Users
- Update Access: Users
- Delete Access: Users

#### Create Indexes:

1. **userId_courseId_index**
   - Type: Key
   - Attributes: userId (ASC), courseId (ASC)

2. **status_index**
   - Type: Key
   - Attributes: status (ASC)

### 2. Update Existing Courses Collection

Add these new attributes to your `courses` collection:

1. **requiresProject** (Boolean, Required, Default: false)
2. **projectRequirements** (String, 2000, Optional)
3. **projectInstructions** (String, 2000, Optional)

### 3. Environment Variable

The `.env` file has been updated with:
```
VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID=project_submissions
```

## How It Works

### Admin Workflow:

1. **Create/Edit Course**
   - Check "This course requires a project submission for certification"
   - Add project requirements (what students should build)
   - Add project instructions (how to submit, format, etc.)

2. **Review Submissions**
   - Click "Project Submissions" tab in Admin Dashboard
   - Filter by: All, Pending, Approved, Rejected
   - View student details, project links, and submission dates

3. **Approve Submission**
   - Click "✓ Approve & Certify" button
   - System marks as certified
   - Alert shows student's email for certificate delivery
   - Send certificate manually via email

4. **Reject Submission**
   - Click "✗ Reject" button
   - Enter rejection reason
   - Student can see feedback and resubmit

### Student Workflow:

1. **Complete Course**
   - Watch all videos to reach 100% completion

2. **Submit Project**
   - Project submission section appears in course sidebar
   - Read requirements and instructions
   - Enter GitHub or Google Drive link
   - Click "Submit Project"

3. **Track Status**
   - View submission status in course page
   - See admin feedback if rejected
   - Resubmit if needed

4. **View Certification**
   - Certified projects show in Profile
   - Certificate count displayed in stats
   - Project link preserved for reference

## UI Components

### CourseView (Student):
- Progress bar shows completion percentage
- Project submission card appears when course requires project
- Only enabled when 100% complete
- Shows status: pending, approved, rejected, or certified
- Displays admin notes and feedback

### AdminDashboard:
- New "Project Submissions" tab
- Filter tabs: All, Pending, Approved, Rejected
- Each submission shows:
  - Student name and email
  - Course title
  - Project link (clickable)
  - Submission date
  - Current status
  - Admin notes (if any)
- Action buttons for pending submissions

### Profile (Student):
- New "Certifications" section with trophy icon
- Shows all certified courses
- Displays certification date
- Links to submitted projects
- Certification count in stats cards

## Email Certificate Process

When admin approves a submission:

1. System shows alert with student's email
2. Admin manually creates and sends certificate via email
3. Certificate should include:
   - Student name
   - Course title
   - Completion date
   - JCI Bogura branding
   - Unique certificate ID (optional)

## Best Practices

### For Admins:
- Review submissions within 48 hours
- Provide constructive feedback when rejecting
- Verify project links work before approving
- Keep certificate templates ready
- Document certificate numbers for records

### For Students:
- Ensure project links are publicly accessible
- Use Google Drive with "Anyone with link can view" setting
- For GitHub, use public repositories
- Test links before submitting
- Follow all project requirements carefully

## Troubleshooting

### Submission Not Showing:
- Ensure course has `requiresProject: true`
- Check if all videos are marked complete
- Verify user is logged in

### Can't Approve Submission:
- Check Appwrite permissions
- Verify admin is logged in
- Ensure collection ID is correct in .env

### Project Link Not Working:
- Verify link format (must be valid URL)
- Check if link is publicly accessible
- Test in incognito/private browser

## Future Enhancements

Potential improvements:
- Automated certificate generation
- Email integration for automatic certificate delivery
- Certificate download from profile
- Project submission deadlines
- Peer review system
- Certificate verification page
- Batch approval for multiple submissions

## Support

For issues or questions:
- Email: jcibogura@gmail.com
- Phone: 01737-349637
- Location: Puran Bogra, Rajshahi Division, Bangladesh
