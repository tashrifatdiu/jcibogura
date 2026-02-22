# JCI Bogura Learning Platform

A modern, responsive learning management system built for JCI Bogura to provide free courses and certifications to members.

## Features

- 🎓 **Course Management**: Browse and enroll in courses without registration
- 📚 **Module-based Learning**: Structured learning with modules and video lessons
- 📊 **Progress Tracking**: Track your learning progress across all courses
- 🎯 **Project Submissions**: Submit projects for certification
- 🏆 **Certificates**: Earn certificates upon course completion
- 🌓 **Dark/Light Mode**: Comfortable viewing in any lighting condition
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 👨‍💼 **Admin Dashboard**: Manage courses, modules, videos, and review submissions

## Tech Stack

- **Frontend**: React 19, React Router
- **Styling**: Tailwind CSS, Custom CSS
- **Backend**: Appwrite (BaaS)
- **Icons**: React Icons
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Appwrite account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tashrifatdiu/jcibogura.git
cd jcibogura
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Appwrite credentials:
```env
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_COLLECTION_ID=users
VITE_APPWRITE_COURSES_COLLECTION_ID=courses
VITE_APPWRITE_MODULES_COLLECTION_ID=modules
VITE_APPWRITE_VIDEOS_COLLECTION_ID=videos
VITE_APPWRITE_USER_PROGRESS_COLLECTION_ID=user_progress
VITE_APPWRITE_PROJECT_SUBMISSIONS_COLLECTION_ID=project_submissions
VITE_ADMIN_EMAIL=your_admin_email@example.com
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables in Vercel project settings
4. Deploy!

## Project Structure

```
jcibogura/
├── public/              # Static assets
│   ├── jcilogo.ico
│   ├── jcilogo.png
│   └── jcilogo.jpeg
├── src/
│   ├── components/      # Reusable components
│   ├── lib/            # Appwrite services and utilities
│   ├── pages/          # Page components
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── ThemeContext.jsx # Theme management
├── .env                # Environment variables
└── package.json        # Dependencies
```

## Features in Detail

### Public Access
- Browse all courses without registration
- View course details, modules, and video lists
- Access About, Contact, FAQ, Terms, and Privacy pages

### User Features
- Register and login to access course content
- Watch video lessons with custom player controls
- Track progress automatically
- Submit projects for certification
- View and manage profile

### Admin Features
- Create and manage courses
- Add modules and videos to courses
- Review and approve project submissions
- Issue certificates to students

## Documentation

For detailed setup instructions, see:
- [Appwrite Setup Guide](APPWRITE_SETUP.md)
- [Collections Setup Guide](APPWRITE_COLLECTIONS_SETUP.md)
- [Project Certification Guide](PROJECT_CERTIFICATION_GUIDE.md)

## Support

For support, email jcibogura@gmail.com or call 01737-349637

## License

This project is developed for JCI Bogura.

## Acknowledgments

- JCI Bogura team for their support and guidance
- All contributors and learners using the platform
