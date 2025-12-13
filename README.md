# BTKCars - Car Sales Website

A modern, responsive car sales website built with React.js, Vite, Tailwind CSS, and Swiper.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with Tailwind CSS
- **Image Carousel**: Auto-playing hero slider with navigation controls
- **Featured Cars**: Grid layout showcasing premium vehicles
- **Navigation**: Sticky navigation bar with smooth transitions
- **Routing**: Multi-page application with React Router
- **Interactive Components**: Hover effects, transitions, and animations

## Tech Stack

- **React.js**: Frontend framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router DOM**: Client-side routing
- **Swiper**: Modern touch slider

## Project Structure

```
btk_cars/
├── src/
│   ├── components/
│   │   ├── TopBar.jsx        # Main navigation with LinksBar
│   │   ├── HeroSlider.jsx    # Auto-playing image carousel
│   │   ├── FeaturedCars.jsx  # Featured cars grid section
│   │   └── Footer.jsx        # Footer with contact info
│   ├── pages/
│   │   ├── Home.jsx          # Home page
│   │   ├── Buy.jsx           # Buy page
│   │   ├── Sell.jsx          # Sell page
│   │   ├── About.jsx         # About page
│   │   └── Contact.jsx       # Contact page with form
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── public/
├── package.json
└── tailwind.config.js
```

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd btk_cars
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the URL shown in the terminal (typically `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Components Overview

### TopBar
- Fixed position navigation bar at the top
- Nested LinksBar component with navigation links
- Responsive mobile menu
- Gradient background

### HeroSlider
- Full-width image carousel
- Auto-play functionality (4-second intervals)
- Navigation arrows and pagination
- Fade transition effects
- Responsive height adjustment

### FeaturedCars
- 3-column grid layout (responsive)
- Car cards with images and specifications
- Hover effects and animations
- View Details and Favorite buttons

### Footer
- Company information and branding
- Quick links navigation
- Services list
- Contact information
- Social media links
- Copyright and legal links

## Customization

### Changing Colors
Edit the Tailwind configuration in `tailwind.config.js` or use Tailwind's utility classes directly in components.

### Adding More Cars
Update the `cars` array in `src/components/FeaturedCars.jsx` with your vehicle data.

### Updating Slider Images
Modify the `slides` array in `src/components/HeroSlider.jsx` with your preferred images.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact info@btkcars.com
