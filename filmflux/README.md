# FilmFlux

FilmFlux is a Movie Recommendation Web App built as part of the ALX Project Nexus Capstone.

## Project Purpose
To build a responsive, modern movie recommendation interface that integrates with external APIs, managing user favorites locally.

## Tech Stack
- **Framework**: Next.js (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with Dark Mode)
- **Font**: Inter (Google Fonts)

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/SamHez/alx-project-nexus.git
    cd alx-project-nexus/filmflux
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Copy `.env.local.example` to `.env.local` and add your API keys.
    ```bash
    cp .env.local.example .env.local
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Folder Structure
- `pages/`: Application routes and views.
- `components/`: Reusable UI components.
- `services/`: API integration services.
- `styles/`: Global styles and Tailwind configuration.
