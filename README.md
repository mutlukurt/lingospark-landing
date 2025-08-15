# LinguaLearn Landing - English Learning Platform

A modern, interactive English learning platform built with React, TypeScript, and Tailwind CSS. LinguaLearn offers a comprehensive learning experience through games, personalized dictionaries, progress tracking, and structured courses.

## 🚀 Features

- **Interactive Hero Section** with animated mascot and floating elements
- **Feature Showcase** with 3 main learning pillars
- **Personal Dictionary** with spaced repetition system
- **Calendar & Streak Tracking** for consistent learning habits
- **Mini-Games** including word matching, speed typing, and puzzles
- **Course Catalog** with structured learning paths
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Smooth Animations** using Framer Motion
- **3D Elements** with React Three Fiber
- **Accessibility Features** with ARIA labels and semantic HTML

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Drei
- **Icons**: Lucide React
- **Fonts**: Inter (body) + Poppins (headings)

## 📦 Installation

1. **Navigate to project directory**
   ```bash
   cd lingospark-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Quick Start

The project is ready to run! Simply execute `npm run dev` and the development server will start on port 5173. The application includes:

- ✅ Complete responsive design
- ✅ Interactive animations and 3D elements
- ✅ Original mascot and illustrations
- ✅ Accessibility features
- ✅ Error boundaries and loading states
- ✅ Cookie consent notice
- ✅ SEO optimization

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: `#5865F2` (Discord Blue)
- **Accent**: `#FFB86B` (Warm Orange)
- **Background**: Gradient from `#F7F9FF` to `#FFF8F2`
- **Text Primary**: `#0F172A`
- **Text Secondary**: `#475569`

### Typography
- **Headings**: Poppins (Bold, Semi-bold)
- **Body Text**: Inter (Regular, Medium)

### Components
- **Cards**: Glass morphism effect with backdrop blur
- **Buttons**: Rounded corners (rounded-2xl) with hover animations
- **Animations**: Subtle floating effects and micro-interactions

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure with proper landmarks
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states for all interactive elements
- Reduced motion support for users with vestibular disorders
- High contrast ratios for text readability

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic code splitting with Vite
- **Optimized Assets**: SVG icons and optimized images
- **Reduced Motion**: Respects user preferences
- **Lighthouse Scores**: Targeting 90+ for Performance and Accessibility

## 📂 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section with mascot
│   ├── Features.tsx     # Feature showcase
│   ├── FeatureCard.tsx  # Individual feature cards
│   ├── DictionaryPreview.tsx  # Dictionary section
│   ├── CalendarPreview.tsx    # Calendar/streak section
│   ├── GamesPreview.tsx       # Games section
│   ├── Courses.tsx      # Courses section
│   ├── CtaBand.tsx      # Call-to-action band
│   ├── Footer.tsx       # Site footer
│   ├── FloatingBits.tsx # Animated particles
│   └── Mascot3D.tsx     # 3D scene with Three.js
├── data/                # Static data
│   ├── features.ts      # Feature definitions
│   └── courses.ts       # Course catalog
├── assets/              # Static assets
├── App.tsx              # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎮 Interactive Elements

### Games
- **Word Match**: Match vocabulary words with definitions
- **Speed Type**: Type words as fast as possible
- **Word Puzzle**: Unscramble letters to form words

### Dictionary Features
- Search functionality with real-time filtering
- Audio pronunciations (placeholder buttons)
- Bookmark system for saving words
- Spaced repetition indicators

### Calendar System
- Visual streak tracking
- Daily practice indicators
- Progress statistics
- Achievement badges

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the details below.

### MIT License

Copyright (c) 2025 Mutlu Kurt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Asset Attribution
- **Mascot Design**: Original blue owl character created specifically for LinguaLearn
- **Icons**: Lucide React (MIT License)
- **Fonts**: Google Fonts (Open Font License)
- **3D Elements**: Custom low-poly shapes using React Three Fiber

## 🤝 Contributing

This is a demo project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support regarding this demo project, please create an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**