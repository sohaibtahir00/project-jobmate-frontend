
# Project JobMate Frontend

**Project JobMate Frontend** is a responsive web application designed to streamline job searches. The frontend is built with React, Vite, and a modern JavaScript stack to deliver a seamless user experience.

## Table of Contents
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Development Notes](#development-notes)
- [Deployment](#deployment)
- [Live Demo](#live-demo)

## Features

1. **User Authentication:**
   - Register and Login functionalities with user preferences stored locally.

2. **Dashboard:**
   - Personalized dashboard displaying user-specific job recommendations.

3. **Job Preferences:**
   - Users can set and edit job preferences including industry, job title, type, and salary range.

4. **Search by Filters:**
   - Search jobs by filters such as job type, title, and recently posted.

5. **Job Management:**
   - Saved, recently viewed, and applied jobs management.

6. **Responsive Design:**
   - Fully responsive layout for desktop, tablet, and mobile devices.

## Folder Structure

```
project-jobmate-frontend/
├── public/                 # Public assets
├── src/
│   ├── assets/             # Images, icons, and static assets
│   ├── components/         # React components
│   │   ├── App/            # Main app logic
│   │   ├── Header/         # Header component
│   │   ├── Main/           # Homepage logic
│   │   ├── Profile/        # User profile dashboard
│   │   ├── Modal/          # Reusable modal components
│   │   ├── ItemCard/       # Job item cards
│   ├── utils/              # Helper functions and constants
│   ├── index.css           # Global styles
│   ├── main.jsx            # Application entry point
├── .gitignore
├── vite.config.js          # Vite configuration
├── package.json            # Project dependencies and scripts
├── README.md               # Documentation
```

## Technologies Used

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Styling:** CSS Modules (BEM methodology)
- **Routing:** React Router
- **Other Libraries:**
  - Material-UI
  - React-Select

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/sohaibtahir00/project-jobmate-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd project-jobmate-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000/
   ```

## Usage

- **Homepage:** Browse job listings, register, or log in.
- **Profile:** Access your dashboard with job preferences and job management features.
- **Filters:** Use advanced filters to narrow job searches.

## Development Notes

1. **BEM Methodology:**
   - All components and styles adhere to BEM for maintainable and scalable CSS.

2. **State Management:**
   - Local component state and context API are utilized for managing user data and application state.

3. **Responsive Design:**
   - Custom CSS media queries ensure responsiveness across devices.

## Deployment

The project is deployed using GitHub Pages.

### Deployment Steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Ensure the `base` URL in `vite.config.js` matches the repository name.

## Live Demo

Check out the live demo here: [Project JobMate Frontend](https://sohaibtahir00.github.io/project-jobmate-frontend/)
