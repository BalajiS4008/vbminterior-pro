# VBM Interior - Stunning Interior Design Website

A modern, colorful, and fully responsive React website for VBM Interior, featuring vibrant gradients, smooth animations, and comprehensive interior design services.

## 🌟 Features

### Design & UI
- **Vibrant Color Palette**: Multiple gradient themes (Primary, Secondary, Accent, Warm, Cool, Ocean, Fire, Sunset)
- **Modern Typography**: Playfair Display for headings, Poppins for body text
- **Smooth Animations**: Fade-in, slide-in, scale-in, and float animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Gradient Text Effects**: Eye-catching gradient text for headings and CTAs

### Pages
1. **Home** - Hero section, features, services showcase, stats, testimonials, blog preview
2. **About** - Company story, mission/vision, core values, team profiles
3. **Services** - Detailed service offerings with process timeline
4. **Portfolio** - Filterable project gallery with category selection
5. **Blog** - Featured articles, blog grid, newsletter subscription
6. **Contact** - Contact info cards, form with webhook integration, FAQ section

### Special Features
- **Auto-Popup Contact Modal**: Appears automatically after 5 seconds on the homepage
- **Webhook Integration**: Form submissions sent to Make.com webhook
- **Interactive Navigation**: Sticky navbar with scroll effects and mobile menu
- **Social Media Integration**: Links to all major social platforms
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🚀 Technologies Used

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **React Icons** - Comprehensive icon library
- **CSS3** - Custom design system with CSS variables
- **Google Fonts** - Poppins & Playfair Display

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd VBMinterior-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🎨 Design System

### Color Gradients
- **Primary**: Purple to violet gradient
- **Secondary**: Pink to red gradient
- **Accent**: Blue to cyan gradient
- **Warm**: Pink to yellow gradient
- **Cool**: Cyan to dark blue gradient
- **Ocean**: Navy to cyan gradient
- **Fire**: Red to peach gradient
- **Sunset**: Pink to light blue gradient

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Poppins (Sans-serif)
- **Sizes**: Responsive using clamp() for fluid typography

### Spacing System
- XS: 0.5rem
- SM: 1rem
- MD: 1.5rem
- LG: 2rem
- XL: 3rem
- 2XL: 4rem

## 📝 Form Integration

The contact forms (both modal and contact page) are integrated with Make.com webhook:

**Webhook URL**: `https://hook.eu1.make.com/cddzd6hvvvvwnmm6twkt5jhvdaipdup3`

### Form Fields
- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Message (required)

### Form Behavior
- Validates all fields before submission
- Shows loading spinner during submission
- Displays success/error messages
- Clears form after successful submission
- Auto-closes modal after 2 seconds on success

## 🎯 Key Components

### Navbar
- Sticky header with scroll effects
- Top bar with contact information
- Mobile-responsive hamburger menu
- Active link highlighting

### Footer
- Multi-column layout
- Quick links and services
- Social media icons with hover effects
- Contact information
- Copyright notice

### Contact Modal
- Auto-appears after 5 seconds on homepage
- 3D-styled design with backdrop blur
- Form validation
- Webhook integration
- Smooth animations

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px
- **Mobile**: < 768px

## 🔧 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📄 Project Structure

```
VBMinterior-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── ContactModal.jsx
│   │   └── ContactModal.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Services.jsx
│   │   ├── Services.css
│   │   ├── Portfolio.jsx
│   │   ├── Portfolio.css
│   │   ├── Blog.jsx
│   │   ├── Blog.css
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-purple: #667eea;
  /* ... more variables */
}
```

### Updating Content
- **Services**: Edit `src/pages/Services.jsx`
- **Team Members**: Edit `src/pages/About.jsx`
- **Blog Posts**: Edit `src/pages/Blog.jsx`
- **Portfolio Projects**: Edit `src/pages/Portfolio.jsx`

### Webhook Configuration
Update the webhook URL in:
- `src/components/ContactModal.jsx`
- `src/pages/Contact.jsx`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Contact Information

- **Phone**: +91 98765 43210
- **Email**: info@vbminterior.com
- **Address**: 123 Design Street, Chennai, Tamil Nadu 600001

## 📄 License

This project is created for VBM Interior.

## 🙏 Acknowledgments

- Design inspiration from [vbminterior.com](http://www.vbminterior.com/)
- Icons from React Icons
- Fonts from Google Fonts

---

**Built with ❤️ using React and Vite**
