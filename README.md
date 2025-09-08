# Dogs Gallery 🐕

A React application for browsing dog breeds and selecting your favorites. Built with modern web technologies for a smooth and interactive user experience.

## Features

- 🐕 Browse different dog breeds
- ❤️ Select and mark favorite breeds
- ⚡ Fast development with Vite
- 🔧 TypeScript support for better development experience

## Tech Stack

- **React** (v19.1.1) - Frontend framework
- **TypeScript** (v5.8.3) - Type safety
- **Material-UI** (v7.3.2) - Component library and styling
- **Emotion** - CSS-in-JS styling
- **Vite** (v7.1.2) - Build tool and dev server
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/reason18/dogs-gallery.git
cd dogs-gallery
```

2. Install dependencies
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Code Quality

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
dogs-gallery/
├── src/
│   ├── assets/        # Assets
│   ├── components/    # React components
│   ├── contexts/       # React contexts
│   ├── hooks/         # React hooks
│   ├── icons/         # Icons
│   ├── pages/         # App pages
│   └── App.tsx        # Main application component
├── public/            # Static assets
├── package.json       # Project configuration
└── README.md         # Project documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build


## TODO:
- add responsiveness
- save favorites to local storage