# CRES Staff Academic Portal

A modern, responsive academic management dashboard for B.S. Abdur Rahman Crescent Institute of Science & Technology staff members.

## 🌟 Features

### Dashboard Views
- **Class Advisor (CA) Dashboard** - Overview for managing class sections, student performance, and attendance
- **Course Faculty (CF) Dashboard** - Teaching management with syllabus tracking and student assignments

### Core Functionality
- ✅ **Dual Role Management** - Switch between Class Advisor and Course Faculty roles
- 📊 **Attendance Tracking** - Mark and manage daily student attendance with auto-suggest
- 📈 **Academic Records** - View semester results and student performance metrics
- 📅 **Time Table Management** - Weekly schedule view with subject and room details
- 📚 **Lesson Planning** - Track syllabus completion and course progress
- ✏️ **Marks Upload** - Configure and upload student marks with validation
- 🎓 **Leave Requests** - Submit and manage leave applications

### Profile Management
- 👤 **Edit Profile** - Click avatar to update personal and professional details
- 📸 **Photo Upload** - Upload and change profile picture
- 💾 **Data Persistence** - Profile data saved in browser storage

### User Interface
- 🎨 **Premium Design** - Modern, clean interface with BSACIST theme
- 📱 **Fully Responsive** - Optimized for phones, tablets, and laptops
- ⚡ **Smooth Animations** - Elegant transitions and interactions
- 🔔 **Real-time Notifications** - Toast notifications for user actions

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile Phones | < 480px | Bottom nav, single column |
| Large Phones | 480-600px | Optimized for touch |
| Tablets | 600-768px | 2-column grids |
| Small Laptops | 768-1024px | Collapsible sidebar |
| Laptops | > 1024px | Full desktop layout |

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with CSS Grid and Flexbox
- **JavaScript (Vanilla)** - No dependencies, pure JS functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Inter typography

## 📂 Project Structure

```
cres_staff/
├── academic.html           # Main HTML file
├── academic-style.css      # Complete styling with responsive design
├── academic-script.js      # All JavaScript functionality
├── package.json            # Project metadata
├── vercel.json            # Vercel deployment config
├── .gitignore             # Git ignore rules
├── .vercelignore          # Vercel ignore rules
├── cres_logo.png          # Institution logo
├── assets/                # Additional assets
│   ├── college_logo.png
│   └── college_name.png
└── public/                # Static files for deployment
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub (already done!)
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel auto-detects and deploys your project
5. Get a live URL instantly

### Local Development
1. Clone the repository
```bash
git clone https://github.com/mohammed-sohail2005/cres_staff-dashboard.git
cd cres_staff-dashboard
```

2. Open `academic.html` in a web browser
```bash
# Using Python (if installed)
python -m http.server 8000

# Then visit: http://localhost:8000
```

## 🎯 How to Use

### Profile Management
1. Click the avatar (UB) in the top-right corner
2. Update your details:
   - First name, last name
   - Email, phone number
   - Designation, department, qualifications
   - Upload a profile photo
3. Click "Save Changes"
4. Profile is saved and persists across sessions

### Navigation
- **Desktop**: Use sidebar menu
- **Tablet**: Click hamburger menu to toggle sidebar
- **Mobile**: Use bottom navigation bar

### Role Switching
- Click role buttons in the navbar (Class Advisor / Course Faculty)
- Dashboard updates based on selected role
- Role context banner shows current role and section

### Attendance Management
1. Navigate to "Attendance" section
2. Mark students present/absent using toggle switches
3. Use "Auto-Suggest" for quick marking
4. Submit attendance to save

## 📝 Features in Detail

### Dashboard
- Statistics cards showing key metrics
- Student alerts and notifications
- Class performance snapshot
- Quick access buttons

### Class Advisor Features
- 64 students in Section A (AI&DS)
- Class attendance overview (88.4% average)
- Student performance monitoring
- Leave request management

### Course Faculty Features
- Subject progress tracking
- Unit-wise completion status
- Today's class schedule
- Student assignment tracking

## 🔐 Data Storage

- Profile data stored in browser's localStorage
- No server-side backend required
- Data persists between sessions
- Can be cleared via browser settings

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Customization

### Colors
Edit CSS variables in `academic-style.css`:
```css
:root {
  --primary: #1B3A5C;
  --accent: #C0392B;
  --success: #38A169;
  /* ... more colors */
}
```

### Content
Edit student data in `academic-script.js`:
```javascript
const STUDENTS = [
  { id: '2021BCS01', name: 'Student Name', attendance: 85, marks: 78 },
  // ... more students
];
```

## 📞 Contact & Support

- **Institution**: B.S. Abdur Rahman Crescent Institute of Science & Technology
- **Repository**: [GitHub](https://github.com/mohammed-sohail2005/cres_staff-dashboard)
- **Live Demo**: [Deployed on Vercel](https://cres-staff-dashboard.vercel.app) (when deployed)

## 📄 License

This project is created for BSACIST educational purposes.

## 🙏 Acknowledgments

- BSACIST administration and faculty
- Font Awesome for icons
- Google Fonts for typography

---

**Version**: 1.0.0  
**Last Updated**: May 25, 2026  
**Status**: Ready for Production ✅
