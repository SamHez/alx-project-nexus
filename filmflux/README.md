# FilmFlux - Modern Movie Exploration Platform

FilmFlux is a high-performance, responsive movie discovery web application built as the capstone project for the **ALX Project Nexus**. It allows users to browse trending, popular, and recommended movies while providing a seamless user experience through persistence and dynamic theme adjustment.

## Project Overview
FilmFlux solves the real-world problem of "decision fatigue" when looking for entertainment. By integrating with the TMDB API, it provides up-to-date movie information, trailers, and personalized recommendations.

From an engineering perspective, this project demonstrates my ability to:
- Build a multi-page application using **Next.js**.
- Implement **TypeScript** for robust, type-safe development.
- Manage **Global State** and **Persistence** without heavy libraries.
- Design a **Fluid UI** with Tailwind CSS that respects user system preferences.
- Orchestrate complex **API Integrations** with proper error handling and optimization.

## Live Demo
> [!NOTE]
> **Live Demo:** (to be added after Netlify deployment)

## Features
- **Browse Trending & Popular Movies:** Catch up with what's hot and what's trending globally.
- **Recommended Movies:** Intelligent suggestions based on the current movie being viewed.
- **Dynamic Movie Details:** Deep-dive into movie overviews, ratings, and release dates.
- **Powerful Search:** Instant search functionality to find specific titles across the database.
- **Persistent Watchlist:** Save your "must-watch" movies. Data persists in `localStorage` so it's there even after a refresh.
- **Smart Theme Engine:** Automatically detects and follows your system browser preference (Light/Dark) with a manual toggle for direct control.
- **Responsive Design:** Optimized for everything from mobile phones up to Ultra-Wide monitors.
- **Performance Optimized:** Leveraging Next.js Image component for lazy loading and efficient asset delivery.

## Tech Stack
- **Next.js (Pages Router):** Chosen for its excellent routing system and built-in performance features.
- **TypeScript:** Ensuring reliability and reducing runtime errors through strict typing.
- **Tailwind CSS:** Used for rapid, utility-first styling and seamless dark mode implementation.
- **TMDB API:** The industry-standard source for comprehensive movie data.
- **LocalStorage:** Used for lightweight, zero-latency persistence of the user's watchlist.
- **Vercel/Netlify Ready:** Built with a modern CI/CD mindset for instant deployment.

## Architecture & Folder Structure
FilmFlux follows a clean separation of concerns to ensure the codebase remains maintainable and scalable:

```text
filmflux/
├── components/     # Reusable UI components (MovieCards, Navbar, Layout)
├── contexts/       # Global state management (Watchlist, Theme)
├── pages/          # File-based routing and page-level components
├── public/         # Static assets and icons
├── services/       # Centralized API logic and external data fetching
├── styles/         # Global CSS and Tailwind configuration
└── utils/          # Helper functions and business logic (Debounce, Formatting)
```

## API Integration
The application interacts with the **TMDB API** using a centralized service layer (`services/movieService.ts`).
- **Environment Variables:** API keys are protected using `.env.local` to prevent exposure.
- **Error Handling:** Robust try-catch blocks ensure the UI fails gracefully with user-friendly error messages if the API is unreachable.
- **Optimization:** Implemented debouncing on search inputs to minimize unnecessary API requests.

## Performance & Optimization
- **Image Optimization:** Used `<Image />` from `next/image` to handle responsive sizing and automatic webp conversion.
- **Conditional Rendering:** Ensures that loaders and empty states are shown appropriately without flickering.
- **Re-render Prevention:** Strategic use of React hooks (`useMemo`, `useCallback`) where necessary to maintain 60fps interactions.

## Accessibility & UX Considerations
- **Semantic HTML:** Using proper tags (`<main>`, `<nav>`, `<section>`) for screen reader compatibility.
- **Keyboard Navigation:** Ensured all buttons and links are focusable and interactive via keyboard.
- **Visual Hierarchy:** Careful use of contrast and typography (Inter) for maximum readability in both Light and Dark modes.

## Git Workflow
This project was developed using iterative, feature-based development:
- **Incremental Commits:** Features were added in small, logical chunks to maintain a clear history.
- **Descriptive Messaging:** Used standardized commit prefixes (feat, fix, docs, refactor) for clarity.
- **Continuous Integration:** Regular pushes to ensure progress was always backed up and ready for peer review.

## Setup Instructions

1. **Clone & Enter:**
   ```bash
   git clone https://github.com/SamHez/alx-project-nexus.git
   cd alx-project-nexus/filmflux
   ```

2. **Install:**
   ```bash
   npm install
   ```

3. **Configure:**
   Create a `.env.local` file in the root and add your TMDB API Key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. **Run:**
   ```bash
   npm run dev
   ```

## Future Improvements
As I continue to iterate on FilmFlux, I plan to:
- Implement a **Node.js backend** to sync the watchlist across devices.
- Add **Authentication** (NextAuth) for personalized user profiles.
- Introduce **Genre filtering** and advanced sorting options.
- Expand test coverage with **Jest and Cypress** for full E2E reliability.
