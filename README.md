# Personal Portfolio Website

## Overview
A modern, responsive portfolio website showcasing my skills, projects, and professional journey as a Full Stack Developer. Built with HTML5, CSS3, and JavaScript, featuring smooth animations, interactive elements, and a clean, professional design.

## 🌟 Features

### 1. Modern UI Components
- Responsive navigation with mobile-friendly menu
- Dynamic background slideshow
- Smooth scrolling animations
- Interactive skill cards
- Professional project showcase
- Contact form with email integration
- Testimonials slider

### 2. Technical Highlights
- **Animations**: Custom-built animations for enhanced user experience
- **Responsive Design**: Fully responsive layout that works on all devices
- **Performance**: Optimized images and smooth transitions
- **Email Integration**: Contact form integrated with EmailJS
- **Clean Code**: Well-structured and documented code

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- JavaScript (ES6+)

### Libraries & APIs
- Font Awesome (Icons)
- Google Fonts
- EmailJS (Contact Form)

### Development Tools
- Git & GitHub
- VS Code
- Chrome DevTools

## 📂 Project Structure
```
My_Portfolio/
│
├── index.html          # Main HTML file
├── style.css          # Main stylesheet
├── script.js          # JavaScript functionality
├── images/           # Image assets
│   ├── slide1.jpg    # Background slideshow images
│   ├── slide2.jpg
│   ├── slide3.jpg
│   ├── slide4.jpg
│   └── img.png       # Profile image
│
└── README.md         # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/My_Portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd My_Portfolio
   ```
3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

## 💡 Key Components

### 1. Navigation
- Responsive navbar with smooth scroll
- Mobile-friendly hamburger menu
- Active section highlighting

### 2. Hero Section
- Dynamic background slideshow
- Typing animation
- Call-to-action buttons

### 3. About Section
- Professional introduction
- Skills showcase
- Educational background

### 4. Projects Section
- Project cards with hover effects
- Technology stack tags
- Live demo & source code links

### 5. Contact Section
- Interactive contact form
- Social media links
- Professional email integration

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## ⚙️ Configuration

### EmailJS Setup
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new email template
3. Update the following in `script.js`:
   ```javascript
   emailjs.init("YOUR_USER_ID");
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', ...)
   ```

## 🔧 Customization

### Colors
The color scheme can be modified in `style.css`:
```css
:root {
    --primary-color: #007ACC;
    --accent-color: #64FFDA;
    /* Add/modify colors as needed */
}
```

### Content
Update personal information in `index.html`:
- Profile details
- Skills
- Projects
- Contact information

## 📝 License
This project is open source and available under the [MIT License](LICENSE).

## 👤 Author
**Shantanu Dwivedi**
- Email: dshantanu63@gmail.com
- LinkedIn: [Shantanu Dwivedi](https://www.linkedin.com/in/shantanu-dwivedi-59b6721b7)
- GitHub: [shantanudwivedi1](https://github.com/shantanudwivedi1/Shan)

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact
For any queries or suggestions, feel free to reach out:
- Email: dshantanu63@gmail.com
- LinkedIn: [Shantanu Dwivedi](https://www.linkedin.com/in/shantanu-dwivedi-59b6721b7)
